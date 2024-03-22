const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'chlqhqo1',
    host: 'localhost',
    port: 5432,
    database: 'paint_company'
});

module.exports = pool;