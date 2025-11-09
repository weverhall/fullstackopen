import { useEffect, useState } from 'react';
import { getDiaries } from './services/diaries';
import List from './components/List';
import Add from './components/Add';
import type { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then(setDiaries).catch(console.error);
  }, []);

  return (
    <div>
      <Add onAddDiary={(newDiary) => setDiaries([...diaries, newDiary])} />
      <List diaries={diaries} />
    </div>
  );
};

export default App;
