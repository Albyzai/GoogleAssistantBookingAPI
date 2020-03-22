const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

// DB Config
// const db = require('./config/keys').mongoURI;

const db =
  'mongodb://jonasmp:password123@ds247479.mlab.com:47479/googleassistantbooking';

console.log('db: ', db);

//  routes
const buildings = require('./routes/api/buildings');
const floors = require('./routes/api/floors');
const rooms = require('./routes/api/rooms');
const users = require('./routes/api/users');
const reservations = require('./routes/api/reservations');

app.use(express.json());
app.use(cors())

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//  API

app.use('/api/users', users);
app.use('/api/reservations', reservations);
app.use('/api/buildings', buildings);
app.use('/api/floors', floors);
app.use('/api/rooms', rooms);

app.use(express.static('client/public'));

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server started on http://localhost:${port}`);
  } else {
    console.log(`Server failed starting with error: ${err}`);
  }
});
