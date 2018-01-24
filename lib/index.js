const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();

app.get("/", function (req, res) {
  res.send('I am alive');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(3000);
console.log('The server started and is listening on port 3000');
