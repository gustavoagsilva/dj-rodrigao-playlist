import { useState } from "react";
import BuscaMusica from "./components/BuscaMusica/BuscaMusica";
import MinhaPlaylist from "./components/MinhaPlaylist/MinhaPlaylist";

function App() {
  const [playlist, setPlayList] = useState([]);

  function addInPlaylist(music) {
    //código para adicionar uma música na playlist
    const exists = playlist.some((item) => {
      return item.trackId === music.trackId;
    });
    !exists && setPlayList([...playlist, music]);
  }

  function removeFromPlayList(music) {
    //código para remover uma música da playlist
    setPlayList(playlist.filter((item) => music.trackId !== item.trackId));
  }
  return (
    <div>
      <h1>Dj Rodrigão</h1>
      <BuscaMusica playlist={playlist} onAdd={addInPlaylist} />
      <MinhaPlaylist playlist={playlist} onRemove={removeFromPlayList} />
    </div>
  );
}

export default App;
