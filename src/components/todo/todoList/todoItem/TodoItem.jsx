import { useState } from "react";
import "./todoItem.css";
import TodoModal from "../todoModal/TodoModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className="todo-row"
        style={{
          background: `linear-gradient(
        to right,
        ${getColor()} ${percent}%,
        #36365a7c ${percent}%
        )`,
        }}
      >
        {/* ПРОЦЕНТЫ */}
        <span className="percent">{todo.dueDate ? `${percent}%` : ""}</span>

        <span className={todo.done ? "done" : ""}>{todo.title}</span>

        <button
          className="todo-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
        >
          X
        </button>
      </div>
      {isModalOpen && (
        <TodoModal todo={todo} onToggle={onToggle} onClose={closeModal} />
      )}
    </>
  );
}

export default TodoItem;
