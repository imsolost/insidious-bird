var knex = require('./knex.js')

var insertRecord = (table, data) => {
  return knex(table).insert(data).returning('*')
    .then(record => record)
}

var insertUser = (data) => {
  return insertRecord('users', data)
    .then(user => user)
}

module.exports = { insertUser }
