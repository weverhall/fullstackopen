export interface HeaderProps {
  name: string;
}

export interface TotalProps {
  total: number;
}

export interface ContentProps {
  parts: CoursePart[];
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}
