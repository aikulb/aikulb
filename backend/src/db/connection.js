import { createClient } from '@libsql/client';
import { config } from '../config/unifiedConfig.js';

// Primary Remote / Configured DB Client
const primaryDb = createClient({
  url: config.db.url,
  authToken: config.db.authToken || undefined,
});

// Robust Local SQLite Database Client Fallback (file:aikulb.db)
const localDb = createClient({
  url: 'file:aikulb.db',
});

export let db = primaryDb;

export async function executeQuery(sql, args = []) {
  try {
    const queryObj = typeof sql === 'object' ? sql : { sql, args };
    return await db.execute(queryObj);
  } catch (error) {
    // If remote Turso network lookup fails (e.g. ENOTFOUND/offline), fall back to local SQLite database file automatically
    if (error.code === 'ENOTFOUND' || error.message?.includes('fetch failed') || error.message?.includes('ENOTFOUND')) {
      console.warn('⚠️ Remote database unreachable. Switching to local SQLite database (file:aikulb.db)...');
      db = localDb;
      const queryObj = typeof sql === 'object' ? sql : { sql, args };
      return await localDb.execute(queryObj);
    }
    console.error('Database query error:', error, 'SQL:', sql, 'ARGS:', args);
    throw error;
  }
}

