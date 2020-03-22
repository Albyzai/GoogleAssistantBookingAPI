const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  name: {
    type: String,
    default: 'building'
  },
  floors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Floor'
    }
  ]
});

module.exports = Building = mongoose.model(
  'Building',
  BuildingSchema,
  'buildings'
);
