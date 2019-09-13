const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
var position;
var users;
var originDestinationRoute;
var boardingTime;
var numberOfTravel;
var gender;

// socket.io server
io.on('connection', socket => {
  socket.on('position', (data) => {
    position = data

    // console.log(data);

    socket.broadcast.emit('position', data)
  });

  socket.on('users', (data) => {
    users = data

    // console.log(data);

    socket.broadcast.emit('users', data)
  })

  socket.on('origin_destination_route', (data) => {
    originDestinationRoute = data

    // console.log(data);

    socket.broadcast.emit('origin_destination_route', data)
  })

  socket.on('boarding_time', (data => {
    boardingTime = data

    // console.log(data);

    socket.broadcast.emit('boarding_time', data)
  }))

  socket.on('number_of_travel', (data => {
    numberOfTravel = data

    // console.log(data);

    socket.broadcast.emit('number_of_travel', data)
  }))

  socket.on('gender', (data => {
    gender = data

    // console.log(data);

    socket.broadcast.emit('gender', data)
  }))
})

nextApp.prepare().then(() => {
  app.get('/position', (req, res) => {
    res.json(position)
  })

  app.get('/users', (req, res) => {
    res.json(users)
  })

  app.get('/origin_destination_route', (req, res) => {
    res.json(originDestinationRoute)
    // console.log(originDestinationRoute);
    
  })

  app.get('/boarding_time', (req, res) => {
    res.json(boardingTime)
    // console.log(originDestinationRoute);
    
  })

  app.get('/number_of_travel', (req, res) => {
    res.json(numberOfTravel)
    // console.log(originDestinationRoute);
    
  })

  app.get('/gender', (req, res) => {
    res.json(gender)
    // console.log(originDestinationRoute);
    
  })


  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(7000, (err) => {
    if (err) throw err
    // console.log('> Ready on http://localhost:7000')
  })
})