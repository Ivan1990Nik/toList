import { useState } from "react";

export default function AuthForm({ onSignUp, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={() => onSignUp(email, password)}>Регистрация</button>
      <button onClick={() => onSignIn(email, password)}>Вход</button>
    </div>
  );
}
