import { useState } from "react";
import BuscaMusica from "./components/BuscaMusica/BuscaMusica";
import MinhaPlaylist from "./components/MinhaPlaylist/MinhaPlaylist";
import "./App.css";

function App() {
  const [festa, setFesta] = useState({ playlist: [], name: "" });
  const { playlist, name } = festa;

  function setName(name) {
    setFesta((current) => ({ ...current, name }));
  }

  function addInPlaylist(music) {
    setFesta((current) => {
      const exists = current.playlist.some(
        (item) => item.trackId === music.trackId,
      );
      if (exists) return current;

      return { ...current, playlist: [...current.playlist, music] };
    });
  }

  function removeFromPlayList(music) {
    setFesta((current) => ({
      ...current,
      playlist: current.playlist.filter((item) => music.trackId !== item.trackId),
    }));
  }
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__titulo">Dj Rodrigão</h1>
        <p className="app__subtitulo">Monte a playlist da sua festa</p>
      </header>
      <BuscaMusica playlist={playlist} onAdd={addInPlaylist} />
      <MinhaPlaylist
        playlist={playlist}
        onRemove={removeFromPlayList}
        name={name}
        setName={setName}
      />
    </div>
  );
}

export default App;
