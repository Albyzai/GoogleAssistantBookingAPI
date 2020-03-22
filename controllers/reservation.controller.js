const Reservation = require('../models/Reservation');
const Building = require('../models/Building')
const Floor = require('../models/Floor')
const Room = require('../models/Room')

// module.exports.create_reservation = (req, res) => {
//   const { startTime, endTime } = req.body;

//   const newReservation = new Reservation({
//     startTime,
//     endTime
//   });

//   newReservation
//     .save()
//     .then((reservation) => res.json(reservation))
//     .catch((err) => res.status(500).json(err));
// };

module.exports.get_reservations = (req, res) => {
  Reservation.find()
    .then((reservations) => res.status(200).json(reservations))
    .catch((err) => res.status(404).json(err));
};


module.exports.create_reservation = (req, res) => {
  const { bookedBy, buildingName, floorName, roomName, date, startTime, endTime} = req.body;

  console.log('BODY: ', req.body)

  const day = new Date(date).getDate()
  const startTimeHours = new Date(startTime).getHours()
  const endTimeHours = new Date(endTime).getHours()
  const newStartTime = new Date(day).setHours(startTimeHours)
  const newEndTime = new Date(day).setHours(endTimeHours)


  console.log('building name: ', buildingName)
  console.log('floor name: ', floorName)
  console.log('room name', roomName)
  console.log('starTime: ', newStartTime)
  console.log('endTime', newEndTime)

  const newReservation = new Reservation({
    bookedBy,
    startTime: newStartTime,
    endTime, newEndTime
  })

  Building.findOne({ name: buildingName})
  .populate({
    path: 'floors',
    populate: {
      path: 'rooms'
    }
  })
    .then(building => {
      console.log('building found xD:', building)
      const floor = building.floors.filter(floor => floor.name == floorName)

      console.log('floor found: ', floor)

      const room = floor[0].rooms.filter(room => room.name == roomName)
      let overlap = false;
      if(room[0]){
        room[0].reservations.map(reservation => {
          overlap = isTimespanOverlap(reservation, newReservation)
          console.log('overlap', overlap)
        })
        
        if(!overlap){
          newReservation.save()
          room[0].reservations.push(newReservation)
          room[0].save()
          floor[0].save()
          building.save()
          return res.status(200).json(building)
        } else {
          return res.stauts(500).json({message: 'The chosen time span for the reservation is already taken, please choose another'})
        }
  
      } else {
        return res.status(404).json({message: 'room not found'})
      }
     
    })
    // .catch(err => res.status(500).json(err))

}

//  if check returns true, there is an overlap of dates
const isTimespanOverlap = (reservation, newReservation) =>
  newReservation.startTime <= reservation.endTime &&
  newReservation.endTime >= reservation.startTime;
