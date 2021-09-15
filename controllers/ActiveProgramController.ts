import ActiveProgram from '../models/ActiveProgramModel.js';
import Program from '../models/ProgramModel.js';
import Workout from '../models/WorkoutModel.js';

export const getActiveProgram = async (_req: any, res: any, next: any) => {
  const activeProgram = await ActiveProgram.findOne()
    ?.populate('program')
    ?.populate('currentWorkout')
    .catch(next);
  res.json(activeProgram);
};

export const updateActiveProgram = (req: any, res: any, next: any) => {
  switch (req.body.action) {
    case 'completeProgram':
      completeProgram(req, res, next);
      break;
    case 'completeWorkout':
      completeWorkout(req, res, next);
      break;
    case 'updateCompletedExercises':
      updateCompletedExercises(req, res, next);
      break;
    default:
      res.status(500).send('Invalid action');
  }
};

const completeProgram = async (req: any, res: any, next: any) => {
  const activeProgram = await ActiveProgram.findOne().catch(next);
  if (!activeProgram) {
    res.status(404).send('No active program was found');
  }
  const program = await Program.findOne({ _id: activeProgram.program });
  if (!program) {
    res.status(404).send('The active program does not exist');
  }
  // Update program status
  program.isActive = false;
  program.isCompleted = true;
  program.save();

  // Delete active program entry
  await ActiveProgram.deleteOne();
  res.status(200).send('Active Program completed');
};
const completeWorkout = async (req: any, res: any, next: any) => {
  const activeProgram = await ActiveProgram.findOne().catch(next);
  if (!activeProgram) {
    res.status(404).send('No active program was found');
  }
  const program = await Program.findOne(
    { _id: activeProgram.program },
    { workouts: 1 }
  ).catch(next);
  if (!program) {
    res.status(404).send('The active program does not exist');
  }

  const nextDay = activeProgram.currentDay + 1;
  // The last workout was finished; complete the program
  if (nextDay > program.workouts.length) {
    completeProgram(req, res, next);
    return;
  }
  const workoutId = program.workouts.find((w) => w.day === nextDay)?.workout;
  if (!workoutId) {
    res.status(404).send(`Workout for day ${nextDay} does not exist.`);
  }
  const nextWorkout = await Workout.findOne({ _id: workoutId }).catch(next);

  // Update active program properties
  activeProgram.currentDay = nextDay;
  activeProgram.currentWorkout = nextWorkout._id;
  activeProgram.completedExercises = Array(nextWorkout.exercises.length).fill(
    false
  );
  activeProgram.save();
  res.status(200).send('Workout completed');
};

const updateCompletedExercises = async (req: any, res: any, next: any) => {
  const activeProgram = await ActiveProgram.findOne().catch(next);
  if (!activeProgram) {
    res.status(404).send('No active program was found');
  }
  activeProgram.completedExercises = req.body.completedExercises;
  activeProgram.save();
  res.status(200).send('Exercises updated');
};
