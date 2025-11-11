import { z } from 'zod';
import express from 'express';
import patientService from '../services/patientService';
import { newPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);

  if (!patient) {
    return res.status(404).send({ error: 'patient with this id not found' });
  }

  return res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
