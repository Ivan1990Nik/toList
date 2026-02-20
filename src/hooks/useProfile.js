import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * useProfile — хук для подгрузки профиля пользователя
 * @param {Object} user - объект пользователя из supabase.auth
 * @returns {Object} { profile, loading, error }
 */
export function useProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_name")
        .eq("id", user.id)
        .single(); // берём только одну запись

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Ошибка загрузки профиля:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

    fetchProfile();

    if (!user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }
  }, [user?.id]);



  

  return { profile, loading, error };
}
