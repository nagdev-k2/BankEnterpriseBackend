const express = require('express')
const port = 3000
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { connection } = require('./src/config/dbConnector');
var cors = require('cors')

async function startServer () {
  const app = express()
  connection.connect((err) => {
    if (!err) {
      console.log("Connected");
    } else {
      console.log("Connection Failed");
    }
  });
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  app.use(cors());
  await apolloServer.start()
  apolloServer.applyMiddleware({app, path: '/graphqli'})
  app.use((req, res) => {
    res.send('Hello from express')
  })
  app.listen(port, () => console.log('app is running'))
}

startServer()