import { useEffect, useState } from "react";
import BuscaMusica from "./components/BuscaMusica/BuscaMusica";
import MinhaPlaylist from "./components/MinhaPlaylist/MinhaPlaylist";
import "./App.css";

const STORAGE_KEY = "dj-rodrigao:festa";

function carregarFesta() {
  const festaVazia = { playlist: [], name: "" };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return festaVazia;

    return {
      playlist: Array.isArray(saved.playlist)
        ? saved.playlist.filter(
            (music) =>
              music &&
              typeof music.trackId === "number" &&
              typeof music.trackName === "string" &&
              typeof music.artistName === "string",
          )
        : [],
      name: typeof saved.name === "string" ? saved.name : "",
    };
  } catch (error) {
    console.error("Não foi possível recuperar a festa salva.", error);
    return festaVazia;
  }
}

function App() {
  // A função recupera os dados antes da primeira renderização.
  const [festa, setFesta] = useState(carregarFesta);
  const { playlist, name } = festa;

  // Salva o nome e as músicas juntos sempre que a festa mudar.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(festa));
    } catch (error) {
      console.error("Não foi possível salvar a festa neste navegador.", error);
    }
  }, [festa]);

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
