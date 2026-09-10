import { createClient } from '@libsql/client';
import { config } from '../config/unifiedConfig.js';

export const db = createClient({
  url: config.db.url,
  authToken: config.db.authToken || undefined,
});

export async function executeQuery(sql, args = []) {
  try {
    return await db.execute({ sql, args });
  } catch (error) {
    console.error('Database query error:', error, 'SQL:', sql, 'ARGS:', args);
    throw error;
  }
}
