const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const _ = require('lodash/core');
const { graphql, buildSchema, GraphQLSchema, GraphQLObjectType } = require('graphql');
const data = require('../sample_data/sample_data.json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Mongoose = require('mongoose');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = require('../db/mongo');
const helpers = require('./api/helpers');

Mongoose.connect(MONGODB_URI);

// Mongoose connection
var db = Mongoose.connection;

db.on('error', () => {
  console.log('FAILED TO CONNECT TO MONGOOSE');
});

db.once('open', () => {
  console.log('CONNECTED TO MONGOOSE');
});

var app = express();

// Session.
app.use(session({
  secret: 'hyuk',
  store: new MongoStore({ mongooseConnection: Mongoose.connection }),
  resave: true,
  saveUninitialized: true
}));

// Headers.
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Encode data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Listen for responses.
app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));

//// Defining end points
// Server home. Currently takes you to GraphQL interface.
app.get('/', function(req, res) {
  res.end('Welcome to my server!');
});

// End point that returns response. For testing purposes.
app.post('/', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.end(String(req.body.input));
});

// // Add todo to mongoDB server on mLab.
// app.post('/addtodo', (req, res) => {
//   helpers.addToDo(req.body, () => {
//     res.end();
//   });
// });

// Add user's username and password to the database.
app.post('/signup', (req, res) => {
  helpers.signup(req.body, (message) => {
    console.log(message);
    res.end();
  });
});

app.post('/login', (req, res) => {
  helpers.login(req.body, (message) => {
    console.log(message);
    res.end();
  });
});


// Retrieve data from JSON data file using GraphQL.
app.post('/data', (req, res) => {
  graphql(schema, req.body.input, rootValue).then(result => {
    res.send(JSON.stringify(result, null, 2));
  });
});

// app.use(session({
//   secret: 'hyuk',
//   store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   resave: true,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());



//////////////////////////////////////////
/////////// GraphQL Playground ///////////
//////////////////////////////////////////

var schema = buildSchema(`
  type Player {
    id: ID
    name: String!
    championshipCount: Int!
    team: Team!
  }

  type Team {
    id: ID
    name: String!
    championshipCount: Int!
    players: [Player!]!
  }

  type Query {
    allPlayers(offset: Int = 0, limit: Int = -1): [Player!]!
  }

  type Mutation {
    createPlayer(name: String,
      championshipCount: Int,
      teamId: String): Player
  }

`);

var root = {
  greetings: {
    hello: () => 'Hello world!',
    goodbye: () => 'See you soon!'
  }
};

var schema2 = buildSchema(`
  type User {
    id: ID
    username: String!
    password: String!
  }

  type Query {
    allUsers(offset: Int = 0, limit: Int = -1, name: String): [User!]!
  }

  type Mutation {
    createUser(username: String,
    password: String): User
  }
`)

var rootValue = {
  allPlayers: args => {
    offset = args['offset'];
    limit = args['limit'];
    r = _.values(data['allPlayers']).slice(offset);
    if (limit > -1) {
      r = r.slice(0, Math.min(limit, r.length));
    }
    _.forEach(r, x => {
      data.allPlayers[x.id].team = data.allTeams[x.teamId];
    });
    return r;
  },
  createPlayer: args => {
    id = (_.values(data['allPlayers']).length + 1).toString();
    args['id'] = id;
    args['team'] = data['allTeams'][args['teamId']];
    data['allPlayers'][id] = args;
    return data['allPlayers'][id];
  }
};

// When going to /graphiql endpoint, will take you to the explorer. 
app.use(
  '/graphiql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
  })
);

// app.get('/', function(req, res) {
//   res.end(JSON.stringify(root.greetings));
// });


// // Retrieve data from JSON data file using GraphQL.
// app.post('/data', (req, res) => {
//   graphql(schema, req.body.input, rootValue).then(result => {
//     res.send(JSON.stringify(result, null, 2));
//   });
// });


//////////////////////////////////////////
//////////////////////////////////////////