import mongoose from 'mongoose';
import Exercise from './ExerciseModel.js';

const quantifiedExerciseSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Exercise,
    required: true,
  },
  type: {
    type: String,
    enum: ['exerciseWithDuration', 'exerciseWithReps'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

interface QuantifiedExerciseDocument extends mongoose.Document {
  exercise: mongoose.Schema.Types.ObjectId;
  type: string;
  quantity: number;
}

const workoutSchema = new mongoose.Schema({
  title: String,
  calories: {
    type: Number,
    min: 0,
  },
  duration: {
    type: Number,
    min: 1,
  },
  exercises: [quantifiedExerciseSchema],
  categories: [String],
});

interface WorkoutDocument extends mongoose.Document {
  title: string;
  calories: number;
  duration: number;
  exercises: QuantifiedExerciseDocument[];
  categories: string[];
}

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
