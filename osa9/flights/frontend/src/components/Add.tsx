import { useState } from 'react';
import { addDiary } from '../services/diaries';
import type { NewDiaryEntry, Visibility, Weather, DiaryEntry, DiaryAddProps } from '../types';

const Add = (props: DiaryAddProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const added: DiaryEntry = await addDiary(newDiary);
      props.onAddDiary(added);
    } catch (error) {
      console.error(error);
    }

    setDate('');
    setWeather('sunny');
    setVisibility('great');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>

      <div>
        <label>
          date:&nbsp;
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
      </div>

      <div>
        <span>visibility:&nbsp;</span>
        {['great', 'good', 'ok', 'poor'].map((v) => (
          <label key={v} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        <span>weather:&nbsp;</span>
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((w) => (
          <label key={w} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        <label>
          comment:&nbsp;
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default Add;
