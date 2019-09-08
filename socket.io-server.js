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