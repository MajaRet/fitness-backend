import Exercise from '../models/ExerciseModel.js';
import Program from '../models/ProgramModel.js';
import ActiveProgram from '../models/ActiveProgramModel.js';
import Workout from '../models/WorkoutModel.js';

import mongoose from 'mongoose';

export function reset_db() {
  Exercise.collection.drop();
  Program.collection.drop();
  Workout.collection.drop();
  ActiveProgram.collection.drop();
  init_db();
}

function init_db() {
  const exercise1 = new Exercise({
    title: 'Sit-Up',
  });

  const exercise2 = new Exercise({
    title: 'Liegestütze',
  });

  const pause = new Exercise({
    title: 'Pause',
  });

  const workout1 = new Workout({
    title: '60 Sit-Ups',
    calories: 30,
    duration: 20,
    exercises: [
      { exercise: exercise1._id, type: 'exerciseWithReps', quantity: 10 },
      { exercise: exercise1._id, type: 'exerciseWithReps', quantity: 20 },
      { exercise: exercise1._id, type: 'exerciseWithReps', quantity: 30 },
    ],
    categories: ['strength', 'cardio'],
  });

  const workout2 = new Workout({
    title: 'Sit-Ups und Liegestütze',
    calories: 100,
    duration: 40,
    exercises: [
      { exercise: exercise1._id, type: 'exerciseWithReps', quantity: 20 },
      { exercise: exercise2._id, type: 'exerciseWithDuration', quantity: 30 },
      { exercise: pause._id, type: 'exerciseWithDuration', quantity: 30 },
      { exercise: exercise1._id, type: 'exerciseWithReps', quantity: 40 },
      { exercise: exercise2._id, type: 'exerciseWithDuration', quantity: 60 },
    ],
    categories: ['strength', 'coordination'],
  });

  const program1 = new Program({
    title: 'Fit in 7 Wochen mit 7 Zwergen',
    slug: 'fit-in-7-wochen-mit-7-zwergen',
    duration: 7,
    difficulty: 'beginner',
    focus: 'cardio',
    description:
      'Wer hat in meinem Bettchen geschlafen? Wahrscheinlich nicht Du, denn mit diesem Programm baust du ordentlich Ausdauer auf!',
    workouts: [
      { workout: workout1._id, day: 1 },
      { workout: workout2._id, day: 2 },
    ],
    isFavorite: false,
    isNewProgram: true,
    isActive: false,
    isCompleted: false,
  });

  const program2 = new Program({
    title: 'Flinke Verbrennung von Pfefferkuchen-Pfunden',
    slug: 'flinke-verbrennung-von-pfefferkuchen-pfunden',
    duration: 6,
    difficulty: 'intermediate',
    focus: 'weightloss',
    description:
      'Zu sehr am Pfefferkuchenhäuschen genascht? Kein Problem! Mit diesem Programm schmelzen die Pfunde dahin wie warmer Zuckerguss!',
    workouts: [
      { workout: workout1._id, day: 1 },
      { workout: workout2._id, day: 2 },
      { workout: workout1._id, day: 3 },
      { workout: workout1._id, day: 4 },
    ],
    isFavorite: false,
    isNewProgram: true,
    isActive: false,
    isCompleted: false,
  });

  const program3 = new Program({
    title: '50 Übungen mit 50kg Haar',
    slug: '50-uebungen-mit-50kg-haar',
    duration: 4,
    difficulty: 'beginner',
    focus: 'strength',
    description:
      'Warum in teure Gerätschaften investieren, wenn du dein eigenes Körpergewicht (oder in diesem Fall Haargewicht) kostenlos nutzen kannst?',
    workouts: [
      { workout: workout2._id, day: 1 },
      { workout: workout2._id, day: 2 },
    ],
    isFavorite: false,
    isNewProgram: true,
    isActive: false,
    isCompleted: false,
  });

  const program4 = new Program({
    title: 'Großmutter, wieso hast du so große Muskeln?',
    slug: 'grossmutter-wieso-hast-du-so-grosse-muskeln',
    duration: 6,
    difficulty: 'intermediate',
    focus: 'strength',
    description:
      'Der große böse Wolf kann einpacken, nachdem Du dieses Programm absolviert hast. Verglichen mit Deinen zukünftigen Muskeln könnte er ebenso gut ein Chihuahua sein!',
    workouts: [{ workout: workout2._id, day: 1 }],
    isFavorite: false,
    isNewProgram: true,
    isActive: false,
    isCompleted: false,
  });

  const program5 = new Program({
    title: '100 Sit-Ups Challenge',
    slug: '100-sit-ups-challenge',
    duration: 5,
    difficulty: 'intermediate',
    focus: 'strength',
    description:
      'Arbeite langsam auf die 100 Sit-Ups hin und spüre wie deine Bauchmuskeln jeden Tag stärker werden.',
    workouts: [
      { workout: workout1._id, day: 1 },
      { workout: workout1._id, day: 2 },
      { workout: workout1._id, day: 3 },
      { workout: workout1._id, day: 4 },
      { workout: workout1._id, day: 5 },
    ],
    isFavorite: false,
    isNewProgram: true,
    isActive: false,
    isCompleted: false,
  });

  const program6 = new Program({
    title: 'Frau Holles Bootcamp',
    slug: 'frau-holles-bootcamp',
    duration: 4,
    difficulty: 'hard',
    focus: 'strength',
    description:
      'Dieses Bootcamp ist nichts für schwache Nerven. Wenn du nicht mit Pech übergossen werden willst, solltest Du dich lieber anstrengen!',
    workouts: [
      { workout: workout2._id, day: 1 },
      { workout: workout1._id, day: 2 },
      { workout: workout2._id, day: 3 },
      { workout: workout1._id, day: 4 },
    ],
    isFavorite: false,
    isNewProgram: true,
    isActive: false,
    isCompleted: false,
  });

  exercise1.save();
  exercise2.save();
  pause.save();
  workout1.save();
  workout2.save();
  program1.save();
  program2.save();
  program3.save();
  program4.save();
  program5.save();
  program6.save();
}

export default init_db;
