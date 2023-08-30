interface ExerciseTypes {
  exercisePeriod: Array<number>;
  target: number;
}

const parseArgs = (args: Array<string>) : ExerciseTypes => {
  if (args.length < 3) throw new Error('too few arguments');
  if (args.length > 10) throw new Error('too many arguments');

  const argsToNumbers = args.map(value => Number(value));
  if (!argsToNumbers.includes(NaN)) {
    const target = Number(argsToNumbers.shift());
    return {
      exercisePeriod: argsToNumbers,
      target: target
      };
  } else {
    throw new Error('wrong types');
  }
};

interface ExerciseCalcTypes {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercisePeriod: Array<number>, target: number) : ExerciseCalcTypes => {
  const periodLength = exercisePeriod.length;
  const trainingDays = (exercisePeriod.filter(d => !(d === 0))).length;
  const average = (exercisePeriod.reduce((a, b) => a + b, 0)) / periodLength;
  const success = target <= average ? true : false;
  let rating = 0;
  let ratingDescription = '';
  
  switch (true) {
    case average < 1 && average >= 0:
      rating = 1;
      break;
    case average >= 1 && average < 2:
      rating = 2;
      break;
    case average >= 2:
      rating = 3;
      break;
  }
  
  switch (rating) {
    case 1:
      ratingDescription = 'could do a lot better with some effort';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'well done';
      break;
  }

  return ({
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average
  });
};

try {
  const { exercisePeriod, target} = parseArgs(process.argv);
  calculateExercises(exercisePeriod, target);
} catch (error) {
  console.log('error: ', error.message);
}

export { parseArgs, calculateExercises };