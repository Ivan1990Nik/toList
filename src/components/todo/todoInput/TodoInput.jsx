import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoInput({ onAdd }) {
  const navigate = useNavigate();

  const [title, setText] = useState("");
  const [value, setValue] = useState("medium");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title, value });
    setValue("medium");
    setText("");
      navigate("/todo");
  };

  return (
    <>
      <input value={title} onChange={(e) => setText(e.target.value)} />
      <select
        value={value}
        name="type"
        id=""
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="low">легкая </option>
        <option value="medium">среднея </option>
        <option value="high">сложная</option>
      </select>
      <button onClick={handleAdd}>Добавить</button>
    </>
  );
}
export default TodoInput;
