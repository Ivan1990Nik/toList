import "./header.css";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

function Header({ user }) {
  const { signOut } = useAuth();
  const { profile } = useProfile(user);

  return (
    <header className="header-header">
      <h2>Твой ежедневник</h2>
      {user && (
        <div className="header-auth">
          <p>{profile?.user_name || "Пользователь"}</p>
          <button onClick={signOut}>Выйти</button>
        </div>
      )}
    </header>
  );
}

export default Header;
