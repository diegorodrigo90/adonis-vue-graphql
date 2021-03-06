'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const GraphQLServer = use('GraphQLServer')

Route.post('/graphql', (context) => {
  return GraphQLServer.handle(context)
})

Route.get('/graphiql', (context) => {
  return GraphQLServer.handleUI(context)
})

// This has to be the last route
Route.any('*', ({view}) =>  view.render('app'))
