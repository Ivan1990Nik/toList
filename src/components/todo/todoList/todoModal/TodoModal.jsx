import "./todoModal.css";

function TodoModal({ onClose, todo, onToggle }) {
  if (!todo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{todo.title}</h2>

        <p>
          Создано:{" "}
          {todo.created_at
            ? new Date(todo.created_at).toLocaleDateString("ru-RU")
            : ""}
        </p>
        <p>
          запланировано до:{" "}
          {todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString("ru-RU")
            : "без срока"}
        </p>
        <img
          src={todo.image && todo.image !== "" ? todo.image : "/women.png"}
          alt="todo"
          className="todo-image__modal"
        />
        {!todo.done && (
          <label className="checkbox-label">
            отметить как выполнена -
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggle(todo.id)}
            />
          </label>
        )}
        <p>Статус: {todo.done ? "✅ выполнено" : "⏳ активно"}</p>
      </div>
    </div>
  );
}

export default TodoModal;
