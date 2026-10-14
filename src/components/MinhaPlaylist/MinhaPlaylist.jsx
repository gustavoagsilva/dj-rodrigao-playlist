import "./MinhaPlaylist.css";
import { useEffect, useRef, useState } from "react";
import BotaoEnviarWhatsApp from "../BotaoEnviarWhatsApp/BotaoEnviarWhatsApp";
import NomesMusica from "../NomesMusica/NomesMusica";

function MinhaPlaylist({
  playlist,
  onRemove,
  name,
  setName,
  erroSalvamento,
  onTentarSalvar,
}) {
  const [open, setOpen] = useState(false);
  const painelRef = useRef(null);

  useEffect(() => {
    const painel = painelRef.current;
    const app = painel.closest(".app");
    // A barra muda de altura com o aviso, a abertura e a largura da tela.
    const atualizarEspaco = () => {
      app.style.setProperty(
        "--altura-playlist",
        `${painel.getBoundingClientRect().height}px`,
      );
    };
    atualizarEspaco();
    const observer = new ResizeObserver(atualizarEspaco);
    observer.observe(painel);
    return () => {
      observer.disconnect();
      app.style.removeProperty("--altura-playlist");
    };
  }, []);

  return (
    <div
      ref={painelRef}
      className={`minha-playlist${open ? " minha-playlist--aberta" : ""}${erroSalvamento ? " minha-playlist--erro" : ""}`}
    >
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
      {erroSalvamento && (
        <div className="minha-playlist__erro-salvamento">
          <p role="alert">
            Não foi possível salvar suas alterações neste navegador. Elas podem
            ser perdidas ao sair ou recarregar a página.
          </p>
          <button type="button" onClick={onTentarSalvar}>
            Tentar salvar novamente
          </button>
        </div>
      )}
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
                <NomesMusica titulo={music.trackName} artista={music.artistName} />
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
