import type { HeaderProps } from '../types.ts';

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

export default Header;
