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
      console.log(data);
      setSearchResults(data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={buscarMusicas}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          placeholder="Digite o nome da música ou do artista"
        />
        <button type="submit">Buscar</button>
        {searchResults.map((music) => (
          <div key={music.trackId}>
            <p>{music.trackName}</p>
            <p>{music.artistName}</p>
            <img src={music.artworkUrl100} alt="Capa da música" />
            <button type="button" onClick={() => onAdd(music)}>
              Adicionar
            </button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default BuscaMusica;
