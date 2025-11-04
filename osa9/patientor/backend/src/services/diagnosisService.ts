import diagnosisData from '../../data/diagnosisData';
import { DiagnosisEntry } from '../types';

const getDiagnosisData = (): DiagnosisEntry[] => {
  return diagnosisData;
};

export default {
  getDiagnosisData,
};
