import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/auth/AuthForm";
function AuthHome() {
  const { user, signUp, signIn, error: authError } = useAuth();

  if (authError) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <p>{authError}</p>
        <h2>❌ Ошибка авторизации</h2>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  // Если пользователь не залогинен — показываем форму авторизации
  if (!user)
    return (
      <div>
        <h2>Твой ежедневник</h2>
        <div className="home_registration">
          <AuthForm onSignUp={signUp} onSignIn={signIn} />
        </div>
      </div>
    );
}
export default AuthHome;
