import "./CardMusica.css";
import { useState } from "react";
import NomesMusica from "../NomesMusica/NomesMusica";

function CardMusica({ music, added, onAdd, onPlay, limiteAtingido }) {
  const [audioError, setAudioError] = useState(false);
  const [usarCapaOriginal, setUsarCapaOriginal] = useState(false);
  // Solicita uma imagem maior ao iTunes para evitar ampliar a miniatura.
  const capaOriginal = music.artworkUrl100;
  const capaMaior = capaOriginal?.replace(
    /\/100x100([a-z]*\.[a-z]+)(?=\?|$)/i,
    "/600x600$1",
  );

  return (
    <div className="card-musica">
      <img
        className="card-musica__capa"
        src={usarCapaOriginal ? capaOriginal : capaMaior}
        alt={`Capa de ${music.trackName}`}
        onError={() => {
          if (!usarCapaOriginal && capaMaior !== capaOriginal) {
            setUsarCapaOriginal(true);
          }
        }}
      />
      <div className="card-musica__info">
        <NomesMusica titulo={music.trackName} artista={music.artistName} />
        <a
          className="card-musica__spotify"
          href={`https://open.spotify.com/search/${encodeURIComponent(music.trackName + " " + music.artistName)}`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir no Spotify
        </a>
      </div>
      {music.previewUrl && !audioError ? (
        <audio
          className="card-musica__audio"
          controls
          preload="none"
          src={music.previewUrl}
          aria-label={`Ouvir prévia de ${music.trackName} (até 30 segundos)`}
          onPlay={(event) => onPlay(event.currentTarget)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 30) {
              event.currentTarget.pause();
              event.currentTarget.currentTime = 0;
            }
          }}
          onError={() => setAudioError(true)}
        />
      ) : (
        <p className="card-musica__aviso" role="status">
          {audioError
            ? "Não foi possível carregar a prévia. Você ainda pode conferir no Spotify."
            : "Prévia indisponível"}
        </p>
      )}
      <button
        className="card-musica__botao-adicionar"
        type="button"
        disabled={added || limiteAtingido}
        onClick={() => onAdd(music)}
      >
        {added
          ? "Música já adicionada"
          : limiteAtingido
            ? "Limite atingido"
            : "Adicionar"}
      </button>
    </div>
  );
}

export default CardMusica;
