import type { ContentProps, CoursePart } from '../types.ts';

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part: CoursePart, i: number) => (
        <p key={`Part${i}`}>
          {part.name} {part.exerciseCount.toString()}
        </p>
      ))}
    </div>
  );
};

export default Content;
