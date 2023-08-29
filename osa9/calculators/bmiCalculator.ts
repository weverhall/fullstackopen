interface BmiValues {
  centimeters: number;
  kilograms: number;
}

export const calculateBmi = (centimeters: number, kilograms: number) => {
  const mSquared = (centimeters/100)^2
  const bmi = kilograms/mSquared

  switch (true) {
    case bmi < 16:
      return "severely underweight";
    case bmi >= 16 && bmi < 17:
      return "moderately underweight";
    case bmi >= 17 && bmi < 18.5:
      return "mildly underweight";
    case bmi >= 18.5 && bmi < 25:
      return "normal";
    case bmi >= 25 && bmi < 30:
      return "overweight";
    default:
      return "obese";
  }
};

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('too few arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        centimeters: Number(args[2]),
        kilograms: Number(args[3])
      }
  } else {
      throw new Error('wrong types');
  }
}

try {
  const { centimeters, kilograms } = parseArguments(process.argv);
  const bmiResult = calculateBmi(centimeters, kilograms);
  console.log(bmiResult);
} catch (error) {
  console.log('error:', error.message);
}