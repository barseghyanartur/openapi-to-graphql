'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const OasGraph = require('../index.js')

let oas = require('./fixtures/example_oas.json')
// let oas = require('./fixtures/instagram.json')
// let oas = require('./fixtures/government_social_work_api.json')

OasGraph.createGraphQlSchema(oas, {viewer: false})
  .then(schema => {
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true
    }))

    app.listen(3001, () => {
      console.log('GraphQL accessible at: http://localhost:3001/graphql')
    })
  })
  .catch(err => {
    console.log(err)
  })
