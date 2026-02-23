import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import "./financialAssistantHome.css"; // отдельный css

function FinancialAssistantHome() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    income,
    expense,
    balance,
  } = useTransactions();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount) return;

    await addTransaction({
      amount: Number(amount),
      type,
      category,
      description,
    });

    // Очистка полей
    setAmount("");
    setDescription("");
    setCategory("");
  }

  return (
    <div className="finance-wrapper">
      <h2>Баланс: {balance}</h2>
      <p>Доходы: {income}</p>
      <p>Расходы: {expense}</p>

      {/* Форма */}
      <form className="todo-input-wrapper" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Сумма"
          className="style-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Название"
          className="style-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Категория"
          className="style-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="priority-buttons">
          <button
            type="button"
            className={`priority-btn ${type === "income" ? "selected" : ""}`}
            onClick={() => setType("income")}
          >
            Доход
          </button>
          <button
            type="button"
            className={`priority-btn ${type === "expense" ? "selected" : ""}`}
            onClick={() => setType("expense")}
          >
            Расход
          </button>
        </div>

        <button type="submit" className="add-btn">
          Добавить
        </button>
      </form>

      {/* Список транзакций */}
      <h3>История:</h3>
<div className="transactions-list">
  {transactions.map((t) => (
    <div key={t.id} className="transaction-item">
      <div className="transaction-info">
        <span className={`transaction-amount ${t.type}`}>
          {t.type === "income" ? "+" : "-"}{t.amount}
        </span>
        <span>{t.description}</span>
        <span>({t.category})</span>
      </div>
      <button
        onClick={() => deleteTransaction(t.id)}
        className="delete-btn"
      >
        Удалить
      </button>
    </div>
  ))}
</div>
</div>

  );
}

export default FinancialAssistantHome;