import type { DiaryListProps, NonSensitiveDiaryEntry } from '../types';
import Diary from './Diary';

const List = (props: DiaryListProps) => {
  return (
    <>
      <h2>Diary entries</h2>
      {props.diaries.map((d: NonSensitiveDiaryEntry) => (
        <Diary key={d.id} {...d} />
      ))}
    </>
  );
};

export default List;
