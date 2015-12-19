var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();

app.use(express.static(__dirname + '/public'));

var messages = [];

function addMessage(name, data) {
	var message = JSON.stringify({name: name, data: data});
	redisClient.lpush('messages', message, function(err, response) {
		redisClient.ltrim('messages', 0, 9);
	});

	if (messages.length > 10) {
		messages.shift();
	}
}

io.on('connection', function(client) {
	client.on('join', function(name) {
		client.nickname = name;

		client.broadcast.emit('user joined', name);
		redisClient.smembers('users', function(err, names) {
			names.forEach(function(name) {
				client.emit('user joined', name);
			});
		});
		redisClient.sadd('users', name);

		redisClient.lrange('messages', 0, -1, function(err, response) {
			messages = response.reverse();
			messages.forEach(function(message) {
				message = JSON.parse(message);
				client.emit('messages', message.name + ": " + message.data);
			});
		});
	});

	client.on('messages', function(data) {
		var nickname = client.nickname;
		message = data;
		data = nickname + ': ' + data;
		client.broadcast.emit('messages', data);
		client.emit('messages', data);
		addMessage(nickname, message);
	});

	client.on('disconnect', function(name) {
		var name = client.nickname;
		client.broadcast.emit('user disconnected', name);

		redisClient.srem('users', name);
	});

	client.on('flush', function(data) {
		redisClient.flushdb();
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
