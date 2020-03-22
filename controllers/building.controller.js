const Building = require('../models/Building');
const Floor = require('../models/Floor');
const Reservation = require('../models/Reservation')

module.exports.get_buildings = (req, res) => {
  Building.find()
    .populate({
      path: 'floors',
      populate: {
        path: 'rooms',
        populate: {
          path: 'reservations'
        }
      }
    })
    .then((buildings) => res.json(buildings))
    .catch((err) => res.status(404).json(err));
};

module.exports.create_building = (req, res) => {
  const { name } = req.body;

  console.log('creating building');

  const newBuilding = new Building({
    name
  });

  newBuilding
    .save()
    .then((building) => res.json(building))
    .catch((err) => res.status(500).json(err));
};

module.exports.get_floors_in_building = (req, res) => {
  const { buildingID } = req.params;

  Building.findById({ _id: buildingID })
    .select('floors')
    .then((floors) => res.status(200).json(floors))
    .catch((err) => res.status(500).json(err));
};

module.exports.create_floor_in_building = (req, res) => {
  const { buildingID } = req.params;
  const { name } = req.body;

  


  Building.findById({ _id: buildingID })
    .then((building) => {
      const newFloor = new Floor({
        building,
        name
      });
      newFloor.save()
      building.floors.push(newFloor);
      building.save();
      return res.status(200).json(building);
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.get_rooms_on_floor_in_building = (req, res) => {
  const { buildingID, floorID } = req.params;

  Building.findById({ _id: buildingID }).then((building) => {
    Floor.findById();
  });
};

module.exports.create_reservation = (req, res) => {
  const { buildingname, floorName, roomName, date, duration} = req.body
}
