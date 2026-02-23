// TodoInput.jsx
import "./todoInput.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoInput({ onAdd }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("medium"); // начальный приоритет

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title, value });
    // сбрасываем форму после добавления
    setTitle("");
    setValue("medium");
    navigate("/todo");
  };

  const priorities = [
    { id: "low", label: "легкая" },
    { id: "medium", label: "средняя" },
    { id: "high", label: "сложная" },
  ];

  return (
    <div className="todo-input-wrapper">
      {/* Поле ввода названия задачи */}
      <input
        className="style-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />

      {/* Кнопки приоритетов */}
      <div className="priority-buttons">
        {priorities.map((p) => (
          <button
            key={p.id}
            type="button"                     // <-- важно!
            className={`priority-btn ${
              value === p.id ? "selected" : ""
            }`}
            onClick={() => setValue(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Кнопка «Добавить» */}
      <button className="add-btn" onClick={handleAdd}>
        Добавить
      </button>
    </div>
  );
}

export default TodoInput;
