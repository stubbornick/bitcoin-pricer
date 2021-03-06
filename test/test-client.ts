import * as io from 'socket.io-client';

const socket = io(
  'http://localhost:3000',
  {
    transports: ['websocket'],
  },
);

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('error', (error) => {
    console.error('error', error);
  });

  socket.on('price', (price) => {
    console.log('price', price);
  });

  socket.on('message', (message) => {
    console.log('message', message);
  });

  socket.emit('hello', 'hello, world');
  socket.emit('authorize', 'hello');
});

console.log('Connecting...');
