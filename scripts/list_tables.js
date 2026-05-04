require('dotenv').config();
const { Client } = require('pg');
(async()=>{
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  try{
    await c.connect();
    const res = await c.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema') ORDER BY table_schema, table_name;");
    console.log(JSON.stringify(res.rows, null, 2));
    await c.end();
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();