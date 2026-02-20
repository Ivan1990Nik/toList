import "./App.css";
import AuthForm from "./components/auth/AuthForm";
import TodoInput from "./components/todoInput/TodoInput";
import TodoList from "./components/todoList/TodoList";
import { useAuth } from "./hooks/useAuth";
import { useTodos } from "./hooks/useTodos";
import { useProfile } from "./hooks/useProfile";

function App() {
  const { user, signUp, signIn, signOut } = useAuth();
  const { profile, loading } = useProfile(user);
  const { activeTodos, completedTodos, addTodo, toggleTodo, deleteTodo } =
    useTodos(user);

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

  // Если пользователь залогинен — показываем todo и имя
  return (
    <>
      <h2>Твой ежедневник</h2>
      <p>добро пожаловать!!! {loading ? "Загрузка..." : profile?.user_name}</p>
      <button onClick={signOut}>Выйти</button>

      <TodoInput onAdd={addTodo} user={user} />

      <h2>Задачи</h2>
      <TodoList
        todos={activeTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <h2>Выполненные</h2>
      <TodoList
        todos={completedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </>
  );
}

export default App;
