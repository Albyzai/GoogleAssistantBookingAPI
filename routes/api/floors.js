const express = require('express');
const router = express.Router();

const FloorController = require('../../controllers/floor.controller');

router.get('/', FloorController.get_floors);

router.post('/:floorID/rooms/', FloorController.create_room_on_floor);
module.exports = router;
