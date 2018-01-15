const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema')();

const start = new Date();
app.get("/", function (req, res) {
  const seconds = (new Date().getTime() - start.getTime()) / 1000;
  res.send(`I am running for ${seconds} seconds`);
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(3000);
console.log('The server started and is listening on port 3000');
