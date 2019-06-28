const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({ name, text, id })

io.on('connection', socket => {

  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Les données saisies ne sont pas correctes!')
    }
    socket.join(data.room)
    cb({ userId: socket.id })
    socket.emit('newMessage', m('admin', `Bienvenue ${data.name}`))
    socket.emit('newMessage', m('NotAdmin', `Some test message for: ${data.name}`)) // test message
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `L'utilisateur ${data.name} est connectée.`))
  })

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' - FROM SERVER'
      })
    }, 500)
  })

})

module.exports = {
  app,
  server
}
