import "./header.css";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

import { FaBook } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

function Header({ user, title, setPage }) {
  const { signOut } = useAuth();
  const { profile } = useProfile(user);

  return (
    <header className="header-header">
      <div className="header-nav">
        <button
          className={title === "Финансы" ? "active" : ""}
          onClick={() => setPage("finance")}
        >
          <FaWallet size={25} />
        </button>
        <button
          className={title === "Ежедневник" ? "active" : ""}
          onClick={() => setPage("todo")}
        >
          <FaBook size={25} />
        </button>
      </div>
      <h2>{title}</h2>
      {user && (
        <>
          <div className="header-auth">
            <p>{profile?.user_name || "Пользователь"}</p>
            <button onClick={signOut}>Выйти</button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
