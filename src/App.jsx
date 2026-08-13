import { useState } from "react";
import BuscaMusica from "./components/BuscaMusica/BuscaMusica";
import MinhaPlaylist from "./components/MinhaPlaylist/MinhaPlaylist";

function App() {
  const [playlist, setPlayList] = useState([]);

  function addInPlaylist(music) {
    //código para adicionar uma música na playlist
    setPlayList([...playlist, music]);
  }
  return (
    <div>
      <h1>Dj Rodrigão</h1>
      <BuscaMusica playlist={playlist} onAdd={addInPlaylist} />
      <MinhaPlaylist playlist={playlist} />
    </div>
  );
}

export default App;
