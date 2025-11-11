import diagnosisData from '../../data/diagnosisData';
import { DiagnosisEntry } from '../types';

const getDiagnosisData = (): DiagnosisEntry[] => {
  return diagnosisData;
};

const getDiagnosisByCode = (code: string) =>
  diagnosisData.find((d) => d.code === code);

export default {
  getDiagnosisData,
  getDiagnosisByCode,
};
