'use strict';
require('dotenv').config();
const { exec } = require('child_process');
const app = require('./app');

const PORT = process.env.PORT || 3000;

function runMigrations() {
  return new Promise((resolve, reject) => {
    console.log('Running migrations...');
    const cmd = 'npx sequelize-cli db:migrate';
    const p = exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) {
        console.error('Migrations failed:', stderr || err.message);
        return reject(err);
      }
      console.log('Migrations finished');
      resolve();
    });
    if (p.stdout) p.stdout.pipe(process.stdout);
    if (p.stderr) p.stderr.pipe(process.stderr);
  });
}

runMigrations()
  .then(() => {
    // Ensure admin user exists (idempotent)
    try {
      const { Usuario } = require('./models');
      const bcrypt = require('bcryptjs');

      (async () => {
        const email = process.env.ADMIN_EMAIL || 'admin@gmail.com';
        const plain = process.env.ADMIN_PASSWORD || '12345678';
        const hash = await bcrypt.hash(plain, 10);
        await Usuario.findOrCreate({
          where: { email },
          defaults: { nombre: 'Admin', password: hash, rol: 'admin' }
        });

        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })();
    } catch (e) {
      console.error('Error ensuring admin user:', e);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Failed to run migrations, exiting.');
    process.exit(1);
  });
