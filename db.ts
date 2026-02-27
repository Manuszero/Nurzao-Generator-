import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// استخدام الرابط الذي وضعناه في Netlify Environment Variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("WARNING: DATABASE_URL is not defined. Database features will be disabled.");
}

const poolConnection = mysql.createPool(connectionString || "");

export const db = drizzle(poolConnection, { schema, mode: 'default' });
