import Program from '../models/ProgramModel.js';
import ActiveProgram from '../models/ActiveProgramModel.js';
import Workout from '../models/WorkoutModel.js';

const favoriteProgram = async (req: any, res: any, next: any) => {
  const programSlug = req.params.programSlug;
  const program = await Program.findOne({ slug: programSlug }).catch(next);
  program.isFavorite = req.body.isFavorite;
  await program.save();
  res.status(200).end();
};

const startProgram = async (req: any, res: any, next: any) => {
  const programSlug = req.params.programSlug;
  // Unset isActive on all other programs
  await Program.updateMany({}, { isActive: false }).catch(next);

  const program = await Program.findOne({ slug: programSlug }).catch(next);
  if (!program) {
    res.status(404).send('Program not found');
  }

  // Delete any previous active program
  await ActiveProgram.deleteOne().catch(next);

  // Get the first workout of the program
  const firstWorkoutId = program.workouts.find((w) => w.day === 1)?.workout;
  const firstWorkout = await Workout.findOne({ _id: firstWorkoutId }).catch(
    next
  );
  if (!firstWorkout) {
    res
      .status(500)
      .send('The program does not have a workout for the first day set.');
    return;
  }

  // Insert the current program as the new active program
  const activeProgram = new ActiveProgram({
    program: program._id,
    currentDay: 1,
    currentWorkout: firstWorkout._id,
    completedExercises: Array(firstWorkout.exercises.length).fill(false),
  });
  activeProgram.save().catch(next);

  // Update the current program's properties
  program.isActive = true;
  program.isNewProgram = false;
  program.save();
  res.status(200).end();
};

export const handleProgramAction = async (req: any, res: any, next: any) => {
  switch (req.body.action) {
    case 'favorite':
      favoriteProgram(req, res, next);
      break;
    case 'start':
      startProgram(req, res, next);
      break;
    default:
      res.status(500).send('Request not understood');
  }
};

export const getProgram = async (req: any, res: any, next: any) => {
  const programSlug = req.params.programSlug;
  let program;
  program = await Program.findOne({ slug: programSlug })
    .populate('workouts.workout')
    .catch(next);
  if (!program) {
    res.status(404).send('Program could not be found');
  } else {
    // If the program is the currently active program, also get its completion
    // status
    let programObj;
    if (program.isActive) {
      const activeProgram = await ActiveProgram.findOne(
        { program: program._id },
        { currentDay: 1 }
      ).catch(next);
      // If no entry is found, the program is not the active program even
      // though it is marked as active. This should not happen.
      console.assert(activeProgram);
      programObj = {
        ...program.toObject(),
        currentDay: activeProgram.currentDay,
      };
    } else {
      programObj = { ...program.toObject() };
    }
    res.json(programObj);
  }
};
