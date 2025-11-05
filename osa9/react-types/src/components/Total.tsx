import type { TotalProps } from '../types.ts';

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

export default Total;
