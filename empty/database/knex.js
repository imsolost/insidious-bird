
 var knex = require('knex') ({
  client: "pg",
  connection: {
    host: 'localhost',
    user: process.env.USER,
    database: 'flappybase'
  },
  searchPath: 'knex, public'
})

module.exports = knex
