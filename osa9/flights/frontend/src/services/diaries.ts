import axios from 'axios';
import type { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  try {
    const res = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`failed to fetch: ${error.response?.status} ${error.response?.statusText}`);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const addDiary = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const res = await axios.post<DiaryEntry>(baseUrl, object, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`failed to add: ${error.response?.status} ${error.response?.statusText}`);
    } else {
      throw new Error(`${error}`);
    }
  }
};
