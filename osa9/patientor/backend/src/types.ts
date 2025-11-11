import { z } from 'zod';
import { newPatientSchema } from './utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

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
  entries: Entry[];
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

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof newPatientSchema>;
