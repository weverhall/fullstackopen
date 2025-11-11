import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Patient, Diagnosis } from '../../types';
import { apiBaseUrl } from '../../constants';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        {patient.name} {patient.gender === 'female' ? '♀' : '♂'}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <p>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          entries
        </Typography>
      </p>

      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <Typography>date: {entry.date}</Typography>
          <Typography>description: {entry.description}</Typography>

          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <div>
              <Typography>diagnosis:</Typography>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses.find((d) => d.code === code);
                return (
                  <Typography key={code} style={{ marginLeft: '1em' }}>
                    {code}{' '}
                    {diagnosis
                      ? `- ${diagnosis.name}${diagnosis.latin ? ` (${diagnosis.latin})` : ''}`
                      : ''}
                  </Typography>
                );
              })}
            </div>
          )}

          <Typography>type: {entry.type}</Typography>

          {entry.type === 'Hospital' && (
            <Typography>
              discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          )}
          {entry.type === 'HealthCheck' && (
            <Typography>health check rating: {entry.healthCheckRating}</Typography>
          )}
          {entry.type === 'OccupationalHealthcare' && (
            <Typography>
              employer: {entry.employerName} <br />
              {entry.sickLeave && (
                <span>
                  sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                </span>
              )}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
