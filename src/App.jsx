import "./App.css";
import AuthForm from "./components/auth/AuthForm";
import TodoInput from "./components/todoInput/TodoInput";
import TodoList from "./components/todoList/TodoList";
import { useAuth } from "./hooks/useAuth";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { user, signUp, signIn, signOut } = useAuth();
  const { activeTodos, completedTodos, addTodo, toggleTodo, deleteTodo } =
    useTodos(user);

  if (!user) return <AuthForm onSignUp={signUp} onSignIn={signIn} />;

  return (
    <>
      <h1>ToDo List</h1>
      <button onClick={signOut}>Выйти</button>
      <TodoInput onAdd={addTodo} />
      <h2>Задачи</h2>
      <TodoList
        todos={activeTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <h2>Completed</h2>
      <TodoList
        todos={completedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </>
  );
}

export default App;
