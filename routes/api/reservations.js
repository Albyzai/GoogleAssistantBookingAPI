const express = require('express');
const router = express.Router();

const ReservationController = require('../../controllers/reservation.controller');

router.get('/', ReservationController.get_reservations);
router.post('/', ReservationController.create_reservation);

module.exports = router;
