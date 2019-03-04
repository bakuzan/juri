const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sslRootCAs = require('ssl-root-cas/latest');

const Constants = require('./constants/index');
const typeDefs = require('./type-definitions');
const resolvers = require('./resolvers');
const context = require('./context');

// Allows SSL certificates that browsers allow, but node doesn't
sslRootCAs
  .inject()
  .addFile(__dirname + '/certs/COMODORSADomainValidationSecureServerCA.crt')
  .addFile(__dirname + '/certs/COMODORSACertificationAuthority.crt')
  .addFile(__dirname + '/certs/-.mangafox.me.crt');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    ...context
  }),
  introspection: true,
  playground: {
    settings: {
      'editor.cursorShape': 'block',
      'editor.fontSize': 16,
      'editor.fontFamily': '"Lucida Console", Consolas, monospace',
      'editor.theme': 'light'
    }
  },
  formatError: (error) => {
    console.log(error);
    return error;
  }
});

// Overide origin if it doesn't exist
app.use(function(req, _, next) {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
});
app.use(
  `/${Constants.appName}`,
  express.static(path.resolve(__dirname, '..', 'build'))
);

// Always return the main index.html, so react-router render the route in the client
if (process.env.NODE_ENV === Constants.environment.production) {
  app.get('*', (req, res, next) => {
    if (req.url.includes('graphql')) {
      next();
    }
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

// Start the server
const PORT =
  (process.env.NODE_ENV === Constants.environment.production
    ? process.env.PORT
    : process.env.SERVER_PORT) || 9000;

server.applyMiddleware({
  app,
  cors: {
    origin: function(origin, callback) {
      if (Constants.whitelist.test(origin)) {
        callback(null, true);
      } else {
        console.log(`Origin: ${origin}, not allowed by CORS`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${server.graphqlPath} to run queries!`
  );
});
