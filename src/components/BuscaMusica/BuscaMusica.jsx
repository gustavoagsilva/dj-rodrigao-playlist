import "./BuscaMusica.css";
import CardMusica from "../CardMusica/CardMusica";
import { useEffect, useRef, useState } from "react";

function BuscaMusica({ playlist, onAdd }) {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const requestRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
      audioRef.current?.pause();
    };
  }, []);

  function tocarPrevia(audio) {
    if (audioRef.current && audioRef.current !== audio) {
      audioRef.current.pause();
    }
    audioRef.current = audio;
  }

  async function buscarMusicas(event) {
    event.preventDefault();
    // Cancela a busca anterior e interrompe a prévia dos resultados antigos.
    requestRef.current?.abort();
    audioRef.current?.pause();
    audioRef.current = null;
    const controller = new AbortController();
    requestRef.current = controller;
    const term = inputText.trim();
    setSearchResults([]);
    setStatus("");

    if (!term) {
      setIsLoading(false);
      setStatus("Digite o nome de uma música ou artista.");
      return;
    }

    setIsLoading(true);
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 20000);

    try {
      const answer = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song`,
        { signal: controller.signal },
      );
      if (!answer.ok) throw new Error("Falha na busca");
      const data = await answer.json();
      if (!Array.isArray(data.results)) throw new Error("Resposta inválida");
      // Mesmo se uma resposta antiga chegar, somente a busca atual pode atualizar a tela.
      if (requestRef.current !== controller || controller.signal.aborted) return;
      const results = data.results.filter(
        (music) =>
          music &&
          typeof music.trackId === "number" &&
          typeof music.trackName === "string" &&
          typeof music.artistName === "string",
      );
      setSearchResults(results);
      if (results.length === 0) {
        setStatus("Nenhuma música encontrada. Tente outro nome ou artista.");
      }
    } catch {
      if (requestRef.current !== controller) return;
      if (timedOut) {
        setStatus("A busca demorou demais. Tente novamente.");
      } else if (!controller.signal.aborted) {
        setStatus(
          "Não foi possível buscar as músicas. Verifique sua conexão e tente novamente.",
        );
      }
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) setIsLoading(false);
    }
  }

  return (
    <div className="busca-musica">
      <form className="busca-musica__form" onSubmit={buscarMusicas}>
        <input
          className="busca-musica__input"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          type="text"
          aria-label="Nome da música ou do artista"
          placeholder="Digite o nome da música ou do artista"
        />
        <button className="busca-musica__botao-buscar" type="submit">
          Buscar
        </button>
      </form>
      <p className="busca-musica__status" role="status" aria-live="polite">
        {isLoading ? "Buscando..." : status}
      </p>
      <div className="busca-musica__resultados" aria-busy={isLoading}>
        {searchResults.map((music) => (
          <CardMusica
            key={music.trackId}
            music={music}
            added={playlist.some((item) => item.trackId === music.trackId)}
            onAdd={onAdd}
            onPlay={tocarPrevia}
          />
        ))}
      </div>
    </div>
  );
}

export default BuscaMusica;
