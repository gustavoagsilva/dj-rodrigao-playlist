import "./BotaoEnviarWhatsApp.css";

const WHATSAPP_NUMBER = "5511987823418";

function BotaoEnviarWhatsApp({ playlist, name }) {
  const message = [
    "Olá, DJ Rodrigão! Estas são as músicas que gostaria de ouvir na festa.",
    ...(name.trim() ? [`Festa: ${name.trim()}`] : []),
    playlist
      .map((music, index) => `${index + 1}. ${music.trackName} — ${music.artistName}`)
      .join("\n"),
  ].join("\n\n");

  if (playlist.length === 0) {
    return (
      <button className="enviar-whatsapp" type="button" disabled>
        Enviar playlist pro DJ
      </button>
    );
  }

  return (
    <a
      className="enviar-whatsapp"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Enviar playlist pro DJ
    </a>
  );
}

export default BotaoEnviarWhatsApp;
