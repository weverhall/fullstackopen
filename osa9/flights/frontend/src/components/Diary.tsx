import type { DiaryEntry } from '../types';

const Diary = (props: DiaryEntry) => {
  return (
    <>
      <p>
        <b>{props.date}</b>
      </p>
      visibility is {props.visibility}
      <br></br>
      weather is {props.weather}
    </>
  );
};
export default Diary;
