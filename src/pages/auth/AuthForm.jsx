import { useState } from "react";
import "./authForm.css";

export default function AuthForm({ onSignUp, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [mode, setMode] = useState("login"); // "login" или "registration"

  // Определяем динамические значения для кнопки и обработчика
  const isLogin = mode === "login";
  const buttonText = isLogin ? "Вход" : "Регистрация";
  const buttonAction = isLogin
    ? () => onSignIn(email, password)
    : () => onSignUp(email, password, userName); // передаем userName при регистрации
  const toggleText = isLogin ? "Регистрация" : "Вход";
  const toggleMode = () => setMode(isLogin ? "registration" : "login");

  return (
    <div className="auth-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Поле username отображаем только при регистрации */}
      {!isLogin && (
        <input
          type="text"
          placeholder="Имя пользователя"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      )}
      <button className="btn" onClick={buttonAction}>
        {buttonText}
      </button>
      
      <p className="toggle-mode" onClick={toggleMode}>
        {toggleText}
      </p>
    </div>
  );
}
