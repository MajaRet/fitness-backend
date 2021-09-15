import Workout from '../models/WorkoutModel.js';
import Program from '../models/ProgramModel.js';
import ActiveProgram from '../models/ActiveProgramModel.js';

export const getCurrentWorkout = async (req: any, res: any, next: any) => {
  const slug = req.params.programSlug;
  const day = parseInt(req.params.day, 10);

  const programDocument = await Program.findOne(
    { slug },
    { workouts: 1 }
  ).catch(next);

  if (!programDocument) {
    res.status(404).send('Program could not be found.');
    return;
  }
  const programLength = programDocument.workouts.length;
  const programDoc = programDocument.workouts.find(
    (workoutWithDay: any) => workoutWithDay.day === day
  );
  const workoutId = programDoc?.workout;

  if (!workoutId) {
    res
      .status(404)
      .send(`The program does not contain a workout for day ${day}.`);
    return;
  }

  const workout = await Workout.findOne({ _id: workoutId })
    .populate('exercises.exercise')
    .catch(next);
  if (!workout) {
    res.status(404).send('Workout could not be found.');
    return;
  }

  const activeProgram = await ActiveProgram.findOne({
    program: programDocument._id,
    currentDay: day,
  }).catch(next);
  let completedExercises;
  if (activeProgram) {
    completedExercises = activeProgram.completedExercises;
  } else {
    completedExercises = Array(workout.exercises.length).fill(false);
  }

  const isLastWorkout = day === programLength;
  const workoutObj = {
    ...workout.toObject(),
    isLastWorkout,
    completedExercises,
  };

  res.json(workoutObj);
};
