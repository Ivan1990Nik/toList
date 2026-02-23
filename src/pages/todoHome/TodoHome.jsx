import "./todoHome.css";
import TodoInput from "../../components/todo/todoInput/TodoInput";
import TodoList from "../../components/todo/todoList/TodoList";
import { useTodos } from "../../hooks/useTodos";
import { Link, Route, Routes } from "react-router-dom";

// Принимаем user как пропс — он приходит из App.js
export default function TodoHome({ user }) {
  const { activeTodos, completedTodos, addTodo, toggleTodo, deleteTodo } =
    useTodos(user);

  return (
    <div className="dashboard">
      {/* Навигация */}
      <nav style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <Link end to="/todo">
          Текущие
        </Link>
        <Link to="/completed">Выполненные</Link>
        <Link to="/add">Добавить</Link>
      </nav>

      {/* Заголовок */}
      <h2>Твой ежедневник</h2>

      {/* Компонент для добавления задачи – всегда виден */}
     

      {/* Маршрутизация внутри страницы */}
      <Routes>
        {/* Текущие задачи */}
        <Route
          path="todo"
          element={
            <div>
              <h2>Текущие</h2>
              <TodoList
                todos={activeTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>
          }
        />

        {/* Выполненные задачи */}
        <Route
          path="completed"
          element={
            <div>
              <h2>Выполненные</h2>
              <TodoList
                todos={completedTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>
          }
        />
         
        <Route path="add" element={<TodoInput onAdd={addTodo} user={user} />} />
      </Routes>
    </div>
  );
}
