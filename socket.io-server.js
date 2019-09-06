const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const writeUserData = require('./firebase-database/write-data-backend')
const writeGEOLocationData = require('./firebase-database/write-data-backend')
const writeLocationNearbyUsersData = require('./firebase-database/write-data-backend')
const writeSearchLocationNearbyUsersData = require('./firebase-database/write-data-backend')
const writeShareMyWayNearbyUsersData = require('./firebase-database/write-data-backend')
const writeDestinationUsersData = require('./firebase-database/write-data-backend')
const writeCreateGroupShareUserData = require('./firebase-database/write-data-backend')
const addUserToGroupShareData = require('./firebase-database/write-data-backend')


const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
var position, users;

// socket.io server
io.on('connection', socket => {
  socket.on('position', (data) => {
    position = data

    writeGEOLocationData(
      data.uid,
      data.displayName,
      data.email,
      data.photoURL,
      data.phoneNumber,
      data.coords,
      data.timestamp
    )
    // console.log(data);

    socket.broadcast.emit('position', data)
  })

  socket.on('users', (data) => {
    users = data

    writeUserData(
      data.uid,
      data.displayName,
      data.email,
      data.photoURL,
      data.phoneNumber,
    )

    // console.log(data);

    socket.broadcast.emit('users', data)
  })
})

nextApp.prepare().then(() => {
  app.get('/position', (req, res) => {
    res.json(position)
  })

  app.get('/users', (req, res) => {
    res.json(users)
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(7000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:7000')
  })
})