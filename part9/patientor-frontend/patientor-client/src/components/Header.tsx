//type for Header component props
interface HeaderProps {
  name: string;
}

//Header component
const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

export default Header;