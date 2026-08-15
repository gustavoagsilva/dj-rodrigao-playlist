import "./BuscaMusica.css";
import { useState } from "react";

function BuscaMusica({ playlist, onAdd }) {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarMusicas(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const answer = await fetch(
        `https://itunes.apple.com/search?term=${inputText}&media=music`,
      );
      const data = await answer.json();
      // console.log(data);
      setSearchResults(data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="busca-musica">
      <form className="busca-musica__form" onSubmit={buscarMusicas}>
        {isLoading && <p>Buscando...</p>}
        <input
          className="busca-musica__input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          placeholder="Digite o nome da música ou do artista"
        />
        <button className="busca-musica__botao-buscar" type="submit">
          Buscar
        </button>
        {searchResults.map((music) => {
          const exists = playlist.some(
            (item) => item.trackId === music.trackId,
          );
          const textButton = exists ? "Música já adicionada" : "Adicionar";

          return (
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
                className="card-musica__botao-adicionar"
                type="button"
                onClick={() => onAdd(music)}
              >
                {textButton}
              </button>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default BuscaMusica;
