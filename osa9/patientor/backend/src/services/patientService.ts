import { v1 as uuid } from 'uuid';
import patientData from '../../data/patientData';
import { PatientEntry, NonSensitivePatientEntry, NewPatient } from '../types';

const getNonSensitivePatientData = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PatientEntry | undefined => {
  return patientData.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): NonSensitivePatientEntry => {
  const id = uuid();
  const newPatient = {
    id,
    occupation: entry.occupation ?? '', // If occupation is missing, return empty string.
    entries: [], // Always initialize as an emptry array.
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatient,
  getNonSensitivePatientData,
  addPatient,
};
