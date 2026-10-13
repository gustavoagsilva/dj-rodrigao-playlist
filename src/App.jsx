import { useState } from "react";
import BuscaMusica from "./components/BuscaMusica/BuscaMusica";
import MinhaPlaylist from "./components/MinhaPlaylist/MinhaPlaylist";
import "./App.css";

const STORAGE_KEY = "dj-rodrigao:festa";
const LIMITE_MUSICAS = 100;

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
  const [erroSalvamento, setErroSalvamento] = useState(false);
  const { playlist, name } = festa;

  // Atualiza a tela mesmo se o navegador não permitir salvar os dados.
  function salvarFesta(proximaFesta) {
    setFesta(proximaFesta);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(proximaFesta));
      setErroSalvamento(false);
    } catch (error) {
      setErroSalvamento(true);
      console.error("Não foi possível salvar a festa neste navegador.", error);
    }
  }

  function setName(name) {
    salvarFesta({ ...festa, name });
  }

  function addInPlaylist(music) {
    if (playlist.length >= LIMITE_MUSICAS) return;
    const exists = playlist.some((item) => item.trackId === music.trackId);
    if (exists) return;
    salvarFesta({ ...festa, playlist: [...playlist, music] });
  }

  function removeFromPlayList(music) {
    salvarFesta({
      ...festa,
      playlist: playlist.filter((item) => music.trackId !== item.trackId),
    });
  }
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__titulo">Dj Rodrigão</h1>
        <p className="app__subtitulo">Monte a playlist da sua festa</p>
      </header>
      <BuscaMusica
        playlist={playlist}
        onAdd={addInPlaylist}
        limiteMusicas={LIMITE_MUSICAS}
      />
      <MinhaPlaylist
        playlist={playlist}
        onRemove={removeFromPlayList}
        name={name}
        setName={setName}
        erroSalvamento={erroSalvamento}
        onTentarSalvar={() => salvarFesta(festa)}
      />
    </div>
  );
}

export default App;
