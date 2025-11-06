import type { ContentProps, CoursePart } from '../types';
import { Part } from './Part';

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((p: CoursePart, i: number) => (
        <Part key={`${i}`} part={p} />
      ))}
    </div>
  );
};

export default Content;
