// --- index.js ---
// • This is the start (entry-point) of our application.
// • Mongoose is used to make communication with MongoDB easy and simple
// -----------------------------------------------------------------------------

const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routeImporter = require('./routes')

const swaggerUi = require('swagger-ui-express');


// • Creating Express instance. Later we will use this to declare routes
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var server = require('http').Server(app);
server.listen(3002)
var io = require('socket.io')(server);

var options = {
  swaggerOptions: {
    url: 'http://petstore.swagger.io/v2/swagger.json'
  }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

// • Connect to MongoDB database. Please be sure you have started MongoDB
// services before running application and replace `MEAN-Template-app` with your
// database's name.
mongoose.connect('mongodb://localhost/TODO-Server', {useNewUrlParser:true,useUnifiedTopology: true }, function(err) {
  if (err) {
    // We want to log if app can not connect to database
    console.log(err)
  } else { // If there is no error during db connection, continue proccess

    io.on('room', function(room) {
      console.log('connect ' + room)
      io.join(room);
    });

    io.sockets.on('connection', function(socket) {
      // once a client has connected, we expect to get a ping from them saying what room they want to join
      socket.on('room', function(room) {
        console.log('connect ' + room)
          socket.join(room);
      });
  });

    // • `/dist` is default file output of ng build command. You can change
    // that on `angular-cli.json` config file but don't forget to change below line
    // too or server will not be able to locate our front-end part of application.
    app.use(express.static(path.join(__dirname, 'dist')))
    const server = require('http').createServer(app);

    server.listen(3001);
    // • This is a special method called `middleware`. Every request will be
    // executed on each request. If you want to exclude a specific route to make it
    // not enter on this middleware, simply declare that route before this function
    app.use('/', function (req, res, next) {
      // • Implement your logic here.
      res.io = io;
      console.log('Time:', Date.now())
      next()
    })
    // • We call use() on the Express application to add the Router to handle path,
    // specifying an URL path on first parameter '/api/example'.
    app.use('/api/', routeImporter)

    // • Every other route that starts with `api/` but not declared above will
    // return `not-found` status. Apply your `not-found` format here.
    app.get('/api/*', (req, res) => {
      res.send({
        message: 'Endpoint not found',
        type: 'error'
      })
    })

    // • Every other route not declared above will redirect us to Angular view
    // called `index.html`. Be sure you have builded and created output files from
    // angular app.
    app.get('*', (req, res) => {
      console.log(req.url)
       res.sendFile(path.join(__dirname, 'dist/index.html'))
    })

    // • Start listening on port 3000 for requests.
    const PORT = 3000
    app.listen(PORT, () => console.log(`Application started successfully on port: ${PORT}!`))


   
  }
})
