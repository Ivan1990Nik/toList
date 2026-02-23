import "./App.css";
import AuthHome from "./pages/authHome/AuthHome";
import { useAuth } from "./hooks/useAuth";
import TodoHome from "./pages/todoHome/TodoHome";
import Header from "./components/header/Header";

function App() {
  const { user } = useAuth();

  // Обработка ошибок загрузки (оставляем как есть)
  // (если у вас есть ошибки в useAuth — их тоже можно обработать здесь)

  return (
    <div className="App">
      <Header user={user}/>
      {!user ? <AuthHome /> : <TodoHome user={user} />}
    </div>
  );
}

export default App;
