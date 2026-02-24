// TodoInput.jsx
import "./todoInput.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoInput({ onAdd }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("medium"); // приоритет
  const [dueDate, setDueDate] = useState(""); // новая дата

  const handleAdd = () => {
    if (!title.trim()) return;

    onAdd({
      title,
      value,
      dueDate, // передаем дату
    });

    // сброс формы
    setTitle("");
    setValue("medium");
    setDueDate("");

    navigate("/todo");
  };

  const priorities = [
    { id: "low", label: "легкая" },
    { id: "medium", label: "средняя" },
    { id: "high", label: "сложная" },
  ];

  return (
    <div className="todo-input-wrapper">
      {/* Название */}
      <input
        className="style-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />

      {/* Дата выполнения */}
      <p>устоновить конечную дату</p>
      <input
        className="style-input"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Приоритет */}
      <div className="priority-buttons">
        {priorities.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`priority-btn ${value === p.id ? "selected" : ""}`}
            onClick={() => setValue(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Добавить */}
      <button className="add-btn" onClick={handleAdd}>
        Добавить
      </button>
    </div>
  );
}

export default TodoInput;
