import "./todoItem.css";

const importanceMap = {
  low: "легкая",
  medium: "средняя",
  high: "сложная",
};

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div  className={`todo-row ${todo.importance}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      <span className={todo.done ? "done" : ""}>{todo.title}</span>
      <span>
        {importanceMap[todo.importance]}
      </span>

      <button className="todo-delete" onClick={() => onDelete(todo.id)}>Удалить</button>
    </div>
  );
}

export default TodoItem;
