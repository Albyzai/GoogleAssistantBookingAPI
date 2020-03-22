const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ReservationSchema = new Schema({
  bookedBy: {
    type: String
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  startTime: {
    type: Date,
    default: () => moment()
  },
  endTime: {
    type: Date,
    default: () => moment().add(1, 'hour')
  }
});

module.exports = Reservation = mongoose.model(
  'Reservation',
  ReservationSchema,
  'reservations'
);
