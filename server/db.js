const Pool = require('pg').Pool;
const connectionString = "postgresql://postgres:chlqhqo1@localhost:5432/paint_company";
// const pool = new Pool({
//     user: 'postgres',
//     password: 'chlqhqo1',
//     host: 'localhost',
//     port: 5432,
//     database: 'paint_company'
// });
const pool = new Pool({
    connectionString,
})

module.exports = pool;