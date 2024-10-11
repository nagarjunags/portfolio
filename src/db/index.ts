// src/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure this environment variable is set in Vercel/locally
  ssl: { rejectUnauthorized: false }, // Important if using SSL
});

// Initialize the Drizzle ORM instance with the connection pool
export const db = drizzle(pool, { schema });
