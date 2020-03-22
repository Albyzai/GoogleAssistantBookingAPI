const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FloorSchema = new Schema({
  building: {
    type: Schema.Types.ObjectId,
    ref: 'Building'
  },
  name: {
    type: String,
    default: 'floor'
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ]
});

module.exports = Floor = mongoose.model('Floor', FloorSchema, 'floors');
