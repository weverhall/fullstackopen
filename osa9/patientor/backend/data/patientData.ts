import { Gender } from '../src/types';

const data = [
  {
    id: '8a3f8970-ba5d-11f0-afb9-a78e4ff52d61',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: Gender.Male,
    occupation: 'New york city cop',
  },
  {
    id: '8c0de0d0-ba5d-11f0-bb06-6925430572ef',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-77A',
    gender: Gender.Male,
    occupation: 'Cop',
  },
  {
    id: '99b7f4a0-ba5d-11f0-a4f7-13604e89386c',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: Gender.Other,
    occupation: 'Technician',
  },
  {
    id: '9b5c2ec0-ba5d-11f0-89c1-37d9542ca179',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: Gender.Female,
    occupation: 'Forensic Pathologist',
  },
  {
    id: '9c271fe0-ba5d-11f0-bffd-9bda0ec3711b',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: Gender.Male,
    occupation: 'Digital evangelist',
  },
];

export default data;
