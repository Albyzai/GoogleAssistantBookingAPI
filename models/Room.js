const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let options = {
  toJSON: {
    virtuals: true
  }
}
const RoomSchema = new Schema({
  floor: {
    type: Schema.Types.ObjectId,
    ref: 'Floor'
  },
  name: {
    type: String,
    default: 'room'
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reservation'
    }
  ],
}, options);

RoomSchema.virtual('vacant').get(function () {
  const currentTime = new Date()

  const overlappings = this.reservations.map(reservation => {
    let startTime = new Date(reservation.startTime)
    let endTime = new Date(reservation.endTime)
    return startTime < currentTime < endTime
  })

  const isOccupied = overlappings.includes(true)

  return !isOccupied
})



module.exports = Room = mongoose.model('Room', RoomSchema, 'rooms');
