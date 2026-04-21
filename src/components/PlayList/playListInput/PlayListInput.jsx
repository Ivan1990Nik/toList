import { useState } from "react";

function PlayListInput({ addTrack, loading }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !audioFile) {
      alert("Введите название и выберите аудио файл");
      return;
    }

    await addTrack({
      title,
      artist,
      imageFile,
      audioFile,
    });

    // очистка формы
    setTitle("");
    setArtist("");
    setImageFile(null);
    setAudioFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="playlist-form">
      <h3>Добавить трек</h3>

      <input
        type="text"
        placeholder="Название трека"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Исполнитель"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      {/* 📸 Картинка */}
      <label>
        Обложка:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>

      {/* 🎵 Аудио */}
      <label>
        Аудио файл:
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Загрузка..." : "Добавить"}
      </button>
    </form>
  );
}

export default PlayListInput;