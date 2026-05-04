require('dotenv').config();
const { Client } = require('pg');
(async()=>{
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  try{
    await c.connect();
    const tables = ['Posts','Users','Usuarios','Categorias','Muebles'];
    for(const t of tables){
      try{
        const cols = await c.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name='${t}' ORDER BY ordinal_position;`);
        console.log('\nTABLE', t);
        console.log(cols.rows);
        const sample = await c.query(`SELECT * FROM "${t}" LIMIT 5;`);
        console.log('SAMPLE:', sample.rows);
      }catch(e){
        console.log(t, 'ERROR', e.message);
      }
    }
    await c.end();
  }catch(e){console.error(e);process.exit(1);} 
})();