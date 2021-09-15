import mongoose from 'mongoose';
import Program from './ProgramModel.js';
import Workout from './WorkoutModel.js';

const activeProgramSchema = new mongoose.Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Program,
  },
  currentWorkout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Workout,
  },
  currentDay: Number,
  completedExercises: [Boolean],
});

interface ActiveProgramDocument extends mongoose.Document {
  program: mongoose.Schema.Types.ObjectId;
  completedExercises: boolean[];
  currentDay: number;
  currentWorkout: mongoose.Schema.Types.ObjectId;
}

const ActiveProgram = mongoose.model<ActiveProgramDocument>(
  'ActiveProgram',
  activeProgramSchema
);

export default ActiveProgram;
