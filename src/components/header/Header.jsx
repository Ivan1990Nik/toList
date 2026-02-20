import "./header.css"
import { useAuth } from "../../hooks/useAuth";

function Header({ user }) {
  const { signOut } = useAuth();

  return (
    <header className="header-header" >
      <h2>Твой ежедневник</h2>
      {user && <button onClick={signOut}>Выйти</button>}
    </header>
  );
}

export default Header;
