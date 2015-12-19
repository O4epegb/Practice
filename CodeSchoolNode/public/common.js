var socket = io.connect('http://localhost:8080');

socket.on('connect', function(data) {
  $('#chat__status').html('Connected to the chat');
  nickname = prompt('What is your nickname?');

  socket.emit('join', nickname);
});

socket.on('user joined', function(name) {
  var user = $('<li class="chat__user">' + name + '</li>').attr('name', name);
  $('#chat__users').append(user);
});

socket.on('user disconnected', function(name) {
  $('.chat__user[name=' + name + ']').remove();
});

$('#chat__form').submit(function(e) {
  e.preventDefault();
  var message = $('#chat__input').val();
  $('#chat__input').val('')
  socket.emit('messages', message)
});

socket.on('messages', function(data) {
  insertMessage(data);
})

$('#flush').click(function() {
  socket.emit('flush');
});

function insertMessage(data) {
  $('#chat__messages').append( '<li class="chat__message">' + data + '</li>' );
}
