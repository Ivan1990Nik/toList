import "./todoList.css"
import TodoItem from "./todoItem/TodoItem";



function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div className="todo-table">
      <div className="todo-row">
        <div>Выполнено</div>
        <div>Название</div>
        <div>важность</div>
        <div>Удалить</div>
      </div>

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;