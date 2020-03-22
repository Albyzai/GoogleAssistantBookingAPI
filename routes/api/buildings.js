const express = require('express');
const router = express.Router();

const BuildingController = require('../../controllers/building.controller');

//  @route  GET api/buildings/
//  @desc   Returns all building
//  @access Public
router.get('/', BuildingController.get_buildings);

//  @route  POST api/buildings/
//  @desc   Create a building
//  @access Public
router.post('/', BuildingController.create_building);

//  @route  GET api/buildings/:id/floors
//  @desc   returns all floors in a building
//  @access Public
router.get('/:buildingID/floors', BuildingController.get_floors_in_building);

//  @route  POST api/buildings/:id/floors
//  @desc   Create a floor in a building
//  @access Public
router.post('/:buildingID/floors', BuildingController.create_floor_in_building);


router.get('/:buildingID/floors/:floorID/rooms', BuildingController.get_rooms_on_floor_in_building);

router.post('/:buildingID/floors/:floorID/rooms', BuildingController.create_floor_in_building);

module.exports = router;
