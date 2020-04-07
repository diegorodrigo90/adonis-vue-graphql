'use strict'

const { join } = require('path')

module.exports = {
  options: {
    debug: false,
    endpointURL: '/graphql',

  },

  schema: join(__dirname, '../app/Schema'),
  resolvers: join(__dirname, '../app/Resolvers'),
}
