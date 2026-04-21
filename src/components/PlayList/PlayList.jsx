import { usePlaylist } from "../../hooks/usePlaylist";


export default function PlayList() {
  const { tracks, loading, error, deleteTrack } = usePlaylist();

  if (loading) {
    return <div>Загрузка треков...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Ошибка: {error}</div>;
  }

  if (!tracks.length) {
    return <div>У тебя пока нет треков 🎵</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎧 My Playlist</h2>

      <div style={styles.grid}>
        {tracks.map((track) => (
          <div key={track.id} style={styles.card}>

            {/* 🎨 Обложка */}
            {track.image && (
              <img
                src={track.image}
                alt={track.title}
                style={styles.image}
              />
            )}

            {/* ℹ️ Инфо */}
            <div style={styles.info}>
              <h3 style={styles.name}>{track.title}</h3>
              <p style={styles.artist}>{track.artist}</p>
            </div>

            {/* 🎵 Плеер */}
            {track.audio && (
              <audio controls style={styles.audio}>
                <source src={track.audio} />
              </audio>
            )}

            {/* ❌ удалить */}
            <button
              style={styles.deleteBtn}
              onClick={() => deleteTrack(track.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  title: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#1f1f1f",
    color: "#fff",
    borderRadius: "12px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  name: {
    margin: 0,
    fontSize: "16px",
  },

  artist: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.7,
  },

  audio: {
    width: "100%",
  },

  deleteBtn: {
    marginTop: "5px",
    background: "#ff3b3b",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },
};