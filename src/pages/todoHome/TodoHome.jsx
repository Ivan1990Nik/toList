import "./todoHome.css";
import TodoInput from "../../components/todo/todoInput/TodoInput";
import TodoList from "../../components/todo/todoList/TodoList";
import { useTodos } from "../../hooks/useTodos";
import { NavLink, Route, Routes } from "react-router-dom";

export default function TodoHome({ user }) {
  const { activeTodos, completedTodos, addTodo, toggleTodo, deleteTodo } =
    useTodos(user);

  return (
    <div className="dashboard">
      {/* Навигация */}
      <nav className="dashbord-nav" style={{}}>
        <NavLink
          end
          to="/todo"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Текущие
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Выполненные
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Добавить
        </NavLink>
      </nav>

      {/* Заголовок */}
      <h2>Твой ежедневник</h2>

      {/* Маршрутизация внутри страницы */}
      <Routes>
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
