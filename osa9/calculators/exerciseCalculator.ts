interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>) : ExerciseValues => {
  if (args.length < 3) throw new Error('too few arguments');
  if (args.length > 50) throw new Error('too many arguments');

  args.shift()
  const argsToNumbers = args.map(value => Number(value));
  if (!argsToNumbers.includes(NaN)) {
    const target = Number(argsToNumbers.shift())
    const average = (argsToNumbers.reduce((a, b) => a + b, 0)) / argsToNumbers.length
    return {
      periodLength: argsToNumbers.length,
      trainingDays: (argsToNumbers.filter(d => !(d === 0))).length,
      success: target <= average ? true : false,
      target: target,
      average: average,
      }
  } else {
    throw new Error('wrong types');
  }
}

const calculateExercises = (periodLength: number, trainingDays: number,
  success: boolean, target: number, average: number) : ExercisesResult => {

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
  })
}

try {
  (process.argv).shift();
  const { periodLength, trainingDays, success, target, average } = parseArgs(process.argv);
  console.log(calculateExercises(periodLength, trainingDays, success, target, average))
} catch (error) {
  console.log('error: ', error.message);
}

export { parseArgs, calculateExercises };