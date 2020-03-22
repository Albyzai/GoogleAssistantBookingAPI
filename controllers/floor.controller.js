const Floor = require('../models/Floor');
const Building = require('../models/Building');
const Room = require('../models/Room');

module.exports.get_floors = (req, res) => {
  Floor.find()
    .then((floors) => res.json(floors))
    .catch((err) => res.status(404).json(err));
};

module.exports.create_floor = (req, res) => {
  const { name } = req.body;

  const newFloor = new Floor({
    name
  });

  newFloor
    .save()
    .then((floor) => res.json(floor))
    .catch((err) => res.status(500).json(err));
};

module.exports.get_floors_from_building = (req, res) => {
  const { buildingID } = req.params;

  Building.findById({ _id: buildingID })
    .select('floors')
    .then((floors) => res.json(floors))
    .catch((err) => res.json(404).json(err));
};

module.exports.create_floor_on_building = (req, res) => {
  const { buildingID, floorName } = req.body;

  const newFloor = new Floor({
    name: floorName
  });

  Building.findById({ _id: buildingID })
    .then((building) => {
      console.log('creating new floor on building');
      newFloor
        .save()
        .then((floor) => building.floors.push(floor))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.create_room_on_floor = (req, res) => {
  const { floorID } = req.params;
  const { name } = req.body;

  const newRoom = new Room({
    name
  });

  newRoom.save();

  Floor.findById({ _id: floorID })
    .then((floor) => {
      floor.rooms.push(newRoom);
      floor.save();
      res.status(200).json(floor);
    })
    .catch((err) => res.status(500).json(err));
};
