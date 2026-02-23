import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

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
    <div>
      <h2>Баланс: {balance}</h2>
      <p>Доходы: {income}</p>
      <p>Расходы: {expense}</p>

      {/* Форма добавления */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Название"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
        <button type="submit">Добавить</button>
      </form>

      {/* Список транзакций */}
      <h3>История:</h3>
      {transactions.map((t) => (
        <div key={t.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: t.type === "income" ? "green" : "red" }}>
            {t.type === "income" ? "+" : "-"}{t.amount}
          </span>
          <span>{t.description}</span>
          <span>({t.category})</span>
          <button
            onClick={() => deleteTransaction(t.id)}
            style={{ color: "white", background: "red", border: "none", padding: "2px 6px", cursor: "pointer" }}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

export default FinancialAssistantHome;