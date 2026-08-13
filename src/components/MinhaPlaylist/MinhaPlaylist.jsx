function MinhaPlaylist({ playlist }) {
  return (
    <div>
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

          <button className="remover-musica__botao-remover" type="button">
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}

export default MinhaPlaylist;
