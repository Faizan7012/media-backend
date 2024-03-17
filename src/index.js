require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { connection } = require('../config/db');
const { root } = require('./resolver');
const { authMiddleware } = require('../middlewares/auth');
const { schema } = require('../models/graphQSchema');



// Create an Express application
const app = express();
app.use(cors())
app.use(express.json())
app.use(authMiddleware);

// Define routes
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    await connection;
  console.log(`Server running on port ${PORT}`);
});
