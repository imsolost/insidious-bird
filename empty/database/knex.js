var knex = require('knex')({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
})

// knex.schema.createTable('user', function (table) {
//   table.string('id'),
//   table.string('score')
// })
//
// knex.schema.createTable('stats', function (table) {
//   table.integer('flaps'),
//   table.integer('score')
// })
