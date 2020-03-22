const Room = require('../models/Room');
const Reservation = require('../models/Reservation');
const moment = require('moment');

module.exports.get_rooms = (req, res) => {
  Room.find()
    .then((room) => res.json(room))
    .catch((err) => res.status(404).json(err));
};

module.exports.create_room = (req, res) => {
  const newRoom = new Reservation({
    name
  });

  newRoom
    .save()
    .then((room) => res.json(room))
    .catch((err) => res.status(500).json(err));
};

module.exports.create_reservation_for_room = (req, res) => {
  const { roomID } = req.params;
  const { bookedBy, startTime, endTime } = req.body;

  const newReservation = new Reservation({
    bookedBy,
    startTime,
    endTime
  });

  newReservation.save();

  moment.range;

  Room.findById({ _id: roomID })
    .populate('reservations')
    .then((room) => {
      let overlap = false;

      room.reservations.map((reservation) => {
        overlap = isTimespanOverlap(reservation, newReservation);
      });

      console.log('dates are overlapping: ', overlap);
      if (overlap) {
        return res.status(500).json({
          message: 'A booking within that time frame is already made'
        });
      }

      room.reservations.push(newReservation);
      room.save();
      res.status(200).json(room);
    })
    .catch((err) => res.status(500).json(err));
};

//  if check returns true, there is an overlap of dates
const isTimespanOverlap = (reservation, newReservation) =>
  newReservation.startTime <= reservation.endTime &&
  newReservation.endTime >= reservation.startTime;

module.export;
