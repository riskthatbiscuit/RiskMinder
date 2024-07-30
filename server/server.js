const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { authMiddleware } = require('./utils/auth')
const path = require('path')
const { typeDefs, resolvers } = require('./schemas')
const mongoose = require('mongoose')
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

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  )

  const MONGODB_URI = process.env.MONGODB_URI || 'https://localhost:27017/RiskMinderDB'

  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
      })
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err)
    })
}

startApolloServer()

// updateStockPrices()
// updateLast10DaysPrices()
// updateExchangeRates()
