import db from './backend/config/db.js';

async function checkSchema() {
  try {
    const { rows } = await db.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='products'");
    console.log(rows[0].sql);
  } catch (e) {
    console.error(e);
  }
}
checkSchema();
