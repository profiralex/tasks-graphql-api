# Tasks GraphQL API
Example of implementing a simple Tasks management API using Node.js and GraphQL.

## Architecture
The architecture is implemented in a simple layered style where the GraphQL
is responsible for interfacing the clients and the business logic is
delegated to special services.

## Persistence
All data is persisted using a in-memory database [LokiJS](http://lokijs.org/).
