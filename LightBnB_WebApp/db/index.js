const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
}