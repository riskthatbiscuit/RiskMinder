const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { authMiddleware } = require('./utils/auth')
const {
  updateStockPrices,
  updateLast10DaysPrices,
} = require('./utils/updateStockPrices')
const { updateExchangeRates } = require('./utils/updateExchangeRates')
const path = require('path')

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')
const PORT = process.env.PORT || 3001

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startApolloServer = async () => {
  await server.start()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  // Important for MERN Setup: When our application runs from production, it functions slightly differently than in development
  // In development, we run two servers concurrently that work together
  // In production, our Node server runs and delivers our client-side bundle from the dist/ folder
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  // Important for MERN Setup: Any client-side requests that begin with '/graphql' will be handled by our Apollo Server
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  )

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    })
  })
}

updateStockPrices()
updateLast10DaysPrices()
updateExchangeRates()
startApolloServer()
