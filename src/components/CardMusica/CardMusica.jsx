import "./CardMusica.css";
import { useState } from "react";

function CardMusica({ music, added, onAdd, onPlay }) {
  const [audioError, setAudioError] = useState(false);

  return (
    <div className="card-musica">
      <img
        className="card-musica__capa"
        src={music.artworkUrl100}
        alt={`Capa de ${music.trackName}`}
      />
      <div className="card-musica__info">
        <p className="card-musica__titulo">{music.trackName}</p>
        <p className="card-musica__artista">{music.artistName}</p>
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
        onClick={() => onAdd(music)}
      >
        {added ? "Música já adicionada" : "Adicionar"}
      </button>
    </div>
  );
}

export default CardMusica;
