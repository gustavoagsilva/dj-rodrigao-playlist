import "./MinhaPlaylist.css";
import { useState } from "react";
import BotaoEnviarWhatsApp from "../BotaoEnviarWhatsApp/BotaoEnviarWhatsApp";

function MinhaPlaylist({ playlist, onRemove, name, setName }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`minha-playlist${open ? " minha-playlist--aberta" : ""}`}>
      <div className="minha-playlist__resumo">
        <p>
          {playlist.length} música{playlist.length !== 1 ? "s" : ""} adicionada
          {playlist.length !== 1 ? "s" : ""}
        </p>
        <button
          className="minha-playlist__botao-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="conteudo-playlist"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Fechar Playlist" : "Ver Playlist"}
        </button>
      </div>
      <div id="conteudo-playlist" className="minha-playlist__conteudo">
        <input
          className="minha-playlist__nome-festa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          aria-label="Nome da festa"
          placeholder="Nome da festa"
        />
        <div className="minha-playlist__musicas">
          {playlist.map((music) => (
            <div className="card-musica" key={music.trackId}>
              <img
                className="card-musica__capa"
                src={music.artworkUrl100}
                alt="Capa da música"
              />

              <div className="card-musica__info">
                <p className="card-musica__titulo">{music.trackName}</p>
                <p className="card-musica__artista">{music.artistName}</p>
              </div>

              <button
                className="remover-musica__botao-remover"
                type="button"
                onClick={() => onRemove(music)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
        <div className="minha-playlist__rodape">
          <BotaoEnviarWhatsApp playlist={playlist} name={name} />
        </div>
      </div>
    </div>
  );
}

export default MinhaPlaylist;
