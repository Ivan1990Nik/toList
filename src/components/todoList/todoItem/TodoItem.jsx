import "./todoItem.css"

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className="todo-row">
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />

            <span className={todo.done ? "done" : ""}>
                {todo.title}
            </span>

            <button onClick={() => onDelete(todo.id)}>Удалить</button>
        </div>
    );
}

export default TodoItem;