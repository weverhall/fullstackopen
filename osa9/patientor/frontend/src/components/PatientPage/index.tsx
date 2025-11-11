import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Patient } from '../../types';
import { Typography } from '@mui/material';
import { apiBaseUrl } from '../../constants';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <p>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          {patient.name} {patient.gender === 'female' ? '♀' : '♂'}
        </Typography>
      </p>
      <p>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </p>
    </div>
  );
};

export default PatientPage;
