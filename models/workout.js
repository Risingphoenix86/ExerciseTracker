const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
      },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: 'You must enter a type to proceed',
        },
        name: {
          type: String,
          trim: true,
          required: 'You must enter a name to proceed',
        },
        duration: {
            type: Number,
            required: 'You must enter a duration (in minutes) to proceed',
        },
        weights: {
            type: Number,
        },
        distance: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
      },
    ]
  });
  
  const Workout = mongoose.model("Workout", workoutSchema);
  
  module.exports = Workout;