import patientData from '../../data/patientData';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

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

export default {
  getPatientData,
  getNonSensitivePatientData,
};
