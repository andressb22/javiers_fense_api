
const {createPool} = require('mysql2/promise')


const pool = createPool({
    host:'72.167.209.98',
    user:'javierfense-01',
    password:'QVdv]_OPE-nt',
    port:3306,
    database:'javiers_fence'
})

/* const pool = createPool({
    host:'localhost',
    user:'root',
    password:'1015412015Af',
    port:3306,
    database:'javiers_fence'
})*/

/*const pool = new Pool({
    user: 'postgres',
    password: '1015412015Af',
    host: 'localhost',
    port: 5432,
    database: 'javiers-fence',
});

const pool = new Pool({
    user: 'postgres',
    password: '1015412015Af',
    host: 'localhost',
    port: 5432,
    database: 'tme_soluciones',
});*/

module.exports = {pool};