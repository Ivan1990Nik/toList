import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useTodos(user) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // ← ДОБАВИЛИ loading
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setTodos(data || []);
    } catch (err) {
      console.error("Ошибка загрузки задач:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [user]); // ← Зависимость: user

  const addTodo = async ({ title, value, dueDate }) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, done: false, importance: value, user_id: user.id, dueDate }])
      .select()
      .single();
    if (error) console.error(error);
    else setTodos((prev) => [...prev, data]);
  };

  const toggleTodo = async (id, done) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ done: !done })
      .eq("id", id)
      .select()
      .single();
    if (error) console.error(error);
    else setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error(error);
    else setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const activeTodos = todos.filter((t) => !t.done);
  const completedTodos = todos.filter((t) => t.done);

  return {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    fetchTodos,
    loading, // ← ВОЗВРАЩАЕМ loading
    error,   // ← И error для единообразия
  };
}
