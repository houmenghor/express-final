const { Pool } = require('pg');
require('dotenv').config();

// Check if we are connecting to a local database
const isLocalDb = 
    process.env.DB_HOST === 'localhost' || 
    process.env.DB_HOST === '127.0.0.1' || 
    process.env.DB_HOST === 'postgres_db' ||
    (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')) ||
    (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('127.0.0.1'));

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: isLocalDb ? false : { rejectUnauthorized: false }
          }
        : {
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              port: process.env.DB_PORT,
              ssl: isLocalDb ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false)
          }
);

pool.connect((err, client, release) => {
    if (err) {
        console.log('Connection failed:', err.message);
    } else {
        console.log('Connected to the database');
        release();
    }
});

module.exports = pool;