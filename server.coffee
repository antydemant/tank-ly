fs = require("fs")
express = require('express')
_ = require("lodash")
app = express()
app.use(express.static(__dirname + '/client'))
http = require 'http'
server = http.createServer(app)
io = require('socket.io').listen(server)
server.listen(3000)

io.sockets.on 'connection', (socket) ->
	socket.on 'move', (data) ->
		console.log 'move event', data
		io.sockets.emit "move", data
	socket.on 'stop', (data) ->
		console.log 'stop event', data
		io.sockets.emit "stop", data
	socket.on 'fire', (data) ->
		console.log 'fire event', data
		io.sockets.emit "fire", data
	socket.on 'connected', (data) ->
		console.log 'new user connected', data
		io.sockets.emit "connected", data
	socket.on 'disconnect', ->
		console.log 'userDisconnected'
		io.sockets.emit('userDisconnected')