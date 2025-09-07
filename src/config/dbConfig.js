const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.user || 'mirako',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'post',
    password: process.env.PGPASSWORD || 'korami',
    port: process.env.PGPORT || 5432,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err.stack);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect(),
};  