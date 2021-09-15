import express from 'express';
import mongoose from 'mongoose';
import { reset_db } from './controllers/init_db.js';

import { listPrograms } from './controllers/BrowseController.js';
import {
  getProgram,
  handleProgramAction,
} from './controllers/ProgramController.js';
import { getCurrentWorkout } from './controllers/WorkoutController.js';

import {
  getActiveProgram,
  updateActiveProgram,
} from './controllers/ActiveProgramController.js';

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitnessDB';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(dbURI);
reset_db();
app.get('/api/', (req: any, res: any) => {
  res.send("It's maybe working!");
});

app.get('/api/programs', listPrograms);
app.get('/api/programs/current', getActiveProgram);
app.post('/api/programs/current', updateActiveProgram);
app.get('/api/programs/:programSlug', getProgram);
app.post('/api/programs/:programSlug', handleProgramAction);

// A day in a program corresponds to a workout.
app.get('/api/programs/:programSlug/:day', getCurrentWorkout);

// Use middleware to send the error message to the client when the server
// encounters an error.
app.use((error: any, req: any, res: any, next: any) => {
  return res.status(500).json({ error: error.toString() });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}.`);
});
