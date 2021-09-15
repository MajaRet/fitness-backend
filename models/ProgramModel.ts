import mongoose from 'mongoose';
import Workout from './WorkoutModel.js';

const workoutWithDaySchema = new mongoose.Schema({
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Workout,
  },
  day: Number,
});

interface WorkoutWithDayDocument extends mongoose.Document {
  workout: mongoose.Schema.Types.ObjectId;
  day: number;
}

const programSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    unique: true,
  },
  duration: Number,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'hard'],
  },
  focus: String,
  description: String,
  workouts: [workoutWithDaySchema],
  isFavorite: Boolean,
  isNewProgram: Boolean, // named to not conflict with reserved schema pathname isNew
  isActive: Boolean,
  isCompleted: Boolean,
});

export interface ProgramDocument extends mongoose.Document {
  title: string;
  duration: number;
  difficulty: string;
  focus: string;
  description: string;
  workouts: WorkoutWithDayDocument[];
  isFavorite: boolean;
  isActive: boolean;
  isCompleted: boolean;
  isNewProgram: boolean;
}

const Program = mongoose.model<ProgramDocument>('Program', programSchema);
export default Program;
