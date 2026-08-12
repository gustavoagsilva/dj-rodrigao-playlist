import { useState } from "react";
import BuscaMusica from "./components/BuscaMusica";

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
    </div>
  );
}

export default App;
