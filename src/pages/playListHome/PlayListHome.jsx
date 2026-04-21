import { NavLink, Route, Routes } from "react-router-dom";
import PlayList from "../../components/PlayList/PlayList";
import PlayListInput from "../../components/PlayList/playListInput/PlayListInput";
import { usePlaylist } from "../../hooks/usePlaylist";

function PlayListHome() {
  const { addTrack, loading } = usePlaylist();

  return (
    <>
      <nav className="dashbord-nav">
        <NavLink to="/music" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          плеер
        </NavLink>

        <NavLink to="/add" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          сохранить
        </NavLink>
      </nav>

      <Routes>
        <Route path="music" element={<PlayList />} />

        <Route
          path="add"
          element={<PlayListInput addTrack={addTrack} loading={loading} />}
        />
      </Routes>
    </>
  );
}

export default PlayListHome;