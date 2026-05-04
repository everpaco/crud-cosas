require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

const TABLES = ['Posts','Users'];
const OUT = 'backups/posts_users_backup.sql';

function quoteIdent(name){ return '"'+name.replace(/"/g,'""')+'"'; }

(async()=>{
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  try{
    await c.connect();
    // ensure backups dir
    fs.mkdirSync('backups', { recursive: true });
    let out = '';

    for(const t of TABLES){
      // get create table (columns)
      const cols = await c.query(
        `SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
         FROM information_schema.columns WHERE table_name=$1 ORDER BY ordinal_position`, [t]
      );
      if(cols.rows.length===0){
        out += `-- Table ${t} not found\n`;
        continue;
      }
      out += `-- DDL for ${t}\n`;
      out += `DROP TABLE IF EXISTS ${quoteIdent(t)} CASCADE;\n`;
      out += `CREATE TABLE ${quoteIdent(t)} (\n`;
      const colDefs = cols.rows.map(r=>{
        let type = r.data_type.toUpperCase();
        if(type==='CHARACTER VARYING' && r.character_maximum_length) type = `VARCHAR(${r.character_maximum_length})`;
        if(type==='TIMESTAMP WITH TIME ZONE') type = 'TIMESTAMPTZ';
        const nullable = r.is_nullable==='NO' ? ' NOT NULL' : '';
        const def = r.column_default ? ` DEFAULT ${r.column_default}` : '';
        return `  ${quoteIdent(r.column_name)} ${type}${def}${nullable}`;
      });
      out += colDefs.join(',\n') + '\n);\n\n';

      // dump rows as INSERTs
      const rows = await c.query(`SELECT * FROM "${t}"`);
      if(rows.rows.length){
        out += `-- Data for ${t}\n`;
        for(const row of rows.rows){
          const colsNames = Object.keys(row).map(quoteIdent).join(', ');
          const vals = Object.values(row).map(v=>{
            if(v===null) return 'NULL';
            if(typeof v==='number') return v;
            // ISO date -> quoted
            return `'${String(v).replace(/'/g,"''")}'`;
          }).join(', ');
          out += `INSERT INTO ${quoteIdent(t)} (${colsNames}) VALUES (${vals});\n`;
        }
        out += '\n';
      }
    }

    fs.writeFileSync(OUT, out, 'utf8');
    console.log('Backup saved to', OUT);

    // Now drop tables
    for(const t of TABLES){
      try{
        await c.query(`DROP TABLE IF EXISTS "${t}" CASCADE;`);
        console.log('Dropped', t);
      }catch(e){ console.error('Error dropping', t, e.message); }
    }

    await c.end();
    console.log('Done.');
  }catch(e){ console.error('Failed:', e); process.exit(1); }
})();