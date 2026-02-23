import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";

export function useTransactions() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // загрузка транзакций
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }

    fetchTransactions();
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setTransactions([]);
    } else {
      setTransactions(data);
    }

    setLoading(false);
  }

  // добавить транзакцию
  async function addTransaction({ amount, type, category, description }) {
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: user.id,
          amount,
          type,
          category,
          description,
        },
      ])
      .select()
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    setTransactions(prev => [data, ...prev]);
  }

  // удалить транзакцию
  async function deleteTransaction(id) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  // расчёты
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return {
    transactions,
    loading,
    error,

    addTransaction,
    deleteTransaction,
    fetchTransactions,

    income,
    expense,
    balance,
  };
}