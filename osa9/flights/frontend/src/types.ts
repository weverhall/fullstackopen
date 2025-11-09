export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiaryListProps {
  diaries: DiaryEntry[];
}

export interface DiaryAddProps {
  onAddDiary: (addedDiary: DiaryEntry) => void;
}

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
