import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl) {
  console.warn('WARNING: Missing TURSO_DATABASE_URL in environment variables.');
}

// Initialize the Turso (libSQL) client
const db = createClient({
  url: tursoUrl || 'file:local.db',
  authToken: tursoAuthToken,
});

export default db;
