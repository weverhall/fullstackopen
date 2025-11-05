import { z } from 'zod';
import { newPatientSchema } from './utils';

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation?: string;
}
// Could remove all schema duplication with this (but the explicit interface might be more clear):
// export interface PatientEntry extends NewPatient {
//   id: number;
// }

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatient = z.infer<typeof newPatientSchema>;
