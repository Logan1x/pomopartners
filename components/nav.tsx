import { ModeToggle } from "./mode-toggle";

const Nav: React.FC = () => {
  return (
    <nav className="flex fixed h-12 w-full bg-transparent border-b-2 border-primary ">
      <ModeToggle />
    </nav>
  );
};

export { Nav };
