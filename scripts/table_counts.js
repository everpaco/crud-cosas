require('dotenv').config();
const { Client } = require('pg');
(async()=>{
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  try{
    await c.connect();
    const tables = ['Categorias','Muebles','Posts','SequelizeMeta','Users','Usuarios'];
    for(const t of tables){
      try{
        const r = await c.query(`SELECT count(*)::int AS cnt FROM "${t}"`);
        console.log(t, r.rows[0].cnt);
      }catch(e){
        console.log(t, 'ERROR', e.message);
      }
    }
    await c.end();
  }catch(e){console.error(e);process.exit(1);} 
})();