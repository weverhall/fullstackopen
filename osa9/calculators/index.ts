import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ReqTypes {
  target: number,
  dailyExercises: Array<number>
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.dir(req.query.centimeters);
  console.dir(req.query.kilograms);

  const { centimeters, kilograms } = req.query;

  if (!isNaN(Number(centimeters)) || !isNaN(Number(kilograms))) {
    const result = calculateBmi(Number(centimeters), Number(kilograms));
    res.send({
      'centimeters': req.query.centimeters,
      'kilograms': req.query.kilograms,
      'bmi': result
      });
  } else {
      res.status(400).json({
        error: 'malformatted parameters'
      });
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body as ReqTypes;
  const target = body.target;
  const dailyExercises = body.dailyExercises;

  if(target === undefined || dailyExercises === undefined) {
    res.status(400).json({
      error: 'parameters missing'
    });
  } 

  if(isNaN(target) || dailyExercises.includes(NaN)) {
    res.status(400).json({
      error: 'malformmatted parameters'
    });
  }

  const result = calculateExercises(dailyExercises, target);
  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});