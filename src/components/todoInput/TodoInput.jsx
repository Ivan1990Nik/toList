import { useState } from "react";

function TodoInput({ onAdd }) {
    const [text, setText] = useState("");


    const handleAdd = () => {
        if (!text.trim()) return;
        onAdd(text);
        setText("");
    };


    return (
        <>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleAdd}>Добавить</button>
        </>
    );
}
export default TodoInput;