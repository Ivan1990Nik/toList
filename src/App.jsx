import "./App.css";
import AuthHome from "./pages/authHome/AuthHome";
import { useAuth } from "./hooks/useAuth";
import FinancialAssistantHome from "./pages/financialAssistantHome/FinancialAssistantHome";
import TodoHome from "./pages/todoHome/TodoHome";
import Header from "./components/header/Header";
import { useState } from "react";
import PlayListHome from "./pages/playListHome/PlayListHome";

function App() {
  const { user } = useAuth();
  const [page, setPage] = useState("todo");
  let title = "Авторизация";

  if (user && page === "todo") {
    title = "Ежедневник";
  }

  if (user && page === "finance") {
    title = "Финансы";
  }
  if (user && page === "music") {
    title = "Музыка";
  }

  // Обработка ошибок загрузки (оставляем как есть)
  // (если у вас есть ошибки в useAuth — их тоже можно обработать здесь)

  return (
    <div className="App">
      <Header user={user} title={title} setPage={setPage} />

      {!user && <AuthHome />}

      {user && page === "todo" && <TodoHome user={user} />}

      {user && page === "finance" && <FinancialAssistantHome user={user} />}

      {user && page === "music" && <PlayListHome user={user} />}
    </div>
  );
}

export default App;
