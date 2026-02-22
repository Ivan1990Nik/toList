import "./todoHome.css";
import TodoInput from "../../components/todoInput/TodoInput";
import TodoList from "../../components/todoList/TodoList";
import { useTodos } from "../../hooks/useTodos";

// Принимаем user как пропс — он приходит из App.js
export default function TodoHome({ user }) {
  const { activeTodos, completedTodos, addTodo, toggleTodo, deleteTodo } =
    useTodos(user);



  return (
    <div className="dashboard">
      <h2>Твой ежедневник</h2>
   

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
    </div>
  );
}
