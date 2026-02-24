import "./todoItem.css";

function TodoItem({ todo, onToggle, onDelete }) {
  const getRemainingPercent = () => {
    if (!todo.created_at || !todo.dueDate) return 100;

    const created = new Date(todo.created_at).getTime();
    const due = new Date(todo.dueDate).getTime();
    const now = Date.now();

    const total = due - created;
    if (total <= 0) return 0;

    const percent = ((due - now) / total) * 100;

    return Math.max(0, Math.min(100, percent));
  };

  const percent = Math.round(getRemainingPercent());

  const getColor = () => {
    if (todo.importance === "high") return "red";
    if (todo.importance === "medium") return "orange";
    return "green";
  };

  return (
    <div
      className="todo-row"
      style={{
        background: `linear-gradient(
          to right,
          ${getColor()} ${percent}%,
          #36365a7c ${percent}%
        )`,
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      <span className={todo.done ? "done" : ""}>{todo.title}</span>

      <span>
        {todo.dueDate
          ? new Date(todo.dueDate).toLocaleDateString("ru-RU")
          : "без срока"}
      </span>

      <button className="todo-delete" onClick={() => onDelete(todo.id)}>
        X
      </button>
      {/* ПРОЦЕНТЫ */}
      <span className="percent">{todo.dueDate ? `${percent}%` : ""}</span>
    </div>
  );
}

export default TodoItem;
