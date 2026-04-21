import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";

export function usePlaylist() {
  const { user } = useAuth();

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📥 Загрузка треков
  const fetchTracks = async () => {
    if (!user) {
      setTracks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("playlist")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTracks(data || []);
    } catch (err) {
      console.error("Ошибка загрузки треков:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [user]);

  // ➕ Добавление трека (картинка + аудио)
  const addTrack = async ({ title, artist, imageFile, audioFile }) => {
    if (!user) return;

    let imageUrl = null;
    let audioUrl = null;

    try {
      setLoading(true);
      setError(null);

      // 📸 загрузка картинки
      if (imageFile) {
        const fileName = `${user.id}/images/${Date.now()}_${imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("playlist-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("playlist-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // 🎵 загрузка аудио
      if (audioFile) {
        const fileName = `${user.id}/audio/${Date.now()}_${audioFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("playlist-audio")
          .upload(fileName, audioFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("playlist-audio")
          .getPublicUrl(fileName);

        audioUrl = data.publicUrl;
      }

      // 💾 сохранение в БД
      const { data, error } = await supabase
        .from("playlist")
        .insert([
          {
            title,
            artist,
            image: imageUrl,
            audio: audioUrl,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // ⚡ обновляем UI
      setTracks((prev) => [data, ...prev]);

    } catch (err) {
      console.error("Ошибка добавления трека:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Удаление трека
  const deleteTrack = async (id) => {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("playlist")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTracks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Ошибка удаления:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    tracks,
    loading,
    error,
    fetchTracks,
    addTrack,
    deleteTrack,
  };
}