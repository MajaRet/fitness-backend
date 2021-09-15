import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
