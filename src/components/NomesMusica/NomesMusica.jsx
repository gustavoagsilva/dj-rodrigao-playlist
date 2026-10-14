import { useState } from "react";
import "./NomesMusica.css";

function NomesMusica({ titulo, artista }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <button
      className={`nomes-musica${expandido ? " nomes-musica--expandido" : ""}`}
      type="button"
      aria-expanded={expandido}
      aria-label={`${expandido ? "Recolher" : "Expandir"} nomes: ${titulo} — ${artista}`}
      title={expandido ? "Recolher nomes" : "Ver nomes completos"}
      onClick={() => setExpandido((atual) => !atual)}
    >
      <span className="card-musica__titulo">{titulo}</span>
      <span className="card-musica__artista">{artista}</span>
      <span className="nomes-musica__seta" aria-hidden="true">
        {expandido ? "▴" : "▾"}
      </span>
    </button>
  );
}

export default NomesMusica;
