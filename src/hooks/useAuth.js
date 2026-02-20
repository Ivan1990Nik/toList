import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Новое: загрузка при старте
  const [error, setError] = useState(null); // Новое: ошибка для клиента

  // Проверяем сессию при загрузке
  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (err) {
        console.error("Ошибка при проверке сессии:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Регистрация
  const signUp = async (email, password, userName) => {
    setError(null); // Сбрасываем предыдущую ошибку
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("Пользователь не создан");

      const newUser = data.user;

      // Создаём профиль
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: newUser.id,
          user_name: userName,
        },
      ]);

      if (profileError) throw profileError;

      return newUser;
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      setError(err.message || "Неизвестная ошибка регистрации");
      throw err; // Можно оставить — если компонент хочет обработать
    } finally {
      setLoading(false);
    }
  };

  // Вход
  const signIn = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        },
      );

      if (authError) throw authError;
      return data.user;
    } catch (err) {
      console.error("Ошибка входа:", err);
      setError(err.message || "Неверный email или пароль");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const signOut = async () => {
    setError(null);
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Ошибка выхода:", err);
      setError(err.message || "Не удалось выйти");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
}
