import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // ← Начинаем с loading: true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Если пользователь не передан — завершаем загрузку как "готово, но без профиля"
      if (!user) {
        setProfile(null);
        setLoading(false); // ← ВАЖНО: завершаем загрузку, потому что ждать нечего
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("user_name")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err.message);
        setError(err);
      } finally {
        setLoading(false); // ← Загрузка завершена — независимо от результата
      }
    };

    fetchProfile();
  }, [user]); // ← Зависимость: user (не user.id — чтобы отлавливать смену с null на объект)

  return { profile, loading, error };
}
