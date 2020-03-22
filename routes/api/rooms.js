const express = require('express');
const router = express.Router();

const RoomController = require('../../controllers/room.controller');

module.exports = router;

router.get('/', RoomController.get_rooms)
router.post(
  '/:roomID/reservations',
  RoomController.create_reservation_for_room
);
