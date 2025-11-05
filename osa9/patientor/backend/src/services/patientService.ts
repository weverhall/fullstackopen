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

const getPatientData = (): PatientEntry[] => {
  return patientData;
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const id = uuid();
  const newPatient = {
    id,
    occupation: entry.occupation ?? '', // If occupation is missing, return empty string.
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatientData,
  getNonSensitivePatientData,
  addPatient,
};
