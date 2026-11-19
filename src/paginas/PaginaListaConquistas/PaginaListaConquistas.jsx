import Principal from "../../componentes/Principal/Principal";
import "./PaginaListaConquistas.css";

const Conquistas = [
  {
    jogo: "GTA V",
    titulo: "Mestre do Crime",
    descricao: "Complete 100% da história e todos os golpes em Los Santos.",
    progresso: "100% (Concluído)",
    trofeus: ["#cd7f32", "#c0c0c0", "#ffd700", "#a855f7"],
  },
  {
      jogo: "Rust",
      titulo: "Sobrevivente Nato",
       descricao: "Sobreviva por 30 dias seguidos e construa uma base de metal.",
      progresso: "85% (42/50 conquistas)",
      trofeus: ["#cd7f32", "#c0c0c0", "#ffd700"],
  },
  {
    jogo: "Fortnite",
    titulo: "Vitória Royale",
    descricao: "Vença 10 partidas seguidas no modo Battle Royale.",
    progresso: "70% (14/20 conquistas)",
    trofeus: ["#cd7f32", "#c0c0c0"],
  },
  {
    jogo: "Valorant",
    titulo: "Mira Implacável",
    descricao: "Consiga um ACE eliminando todo o time adversário na rodada.",
    progresso: "60% (18/30 conquistas)",
     trofeus: ["#cd7f32", "#c0c0c0", "#ffd700"],
  },
  {
    jogo: "Roblox",
     titulo: "Explorador de Mundos",
    descricao: "Jogue e complete desafios em 25 experiências diferentes.",
    progresso: "100% (Concluído)",
    trofeus: ["#cd7f32", "#c0c0c0", "#ffd700", "#a855f7"],
  },
  {
    jogo: "GTA VI",
    titulo: "Bem-vindo a Vice City",
    descricao: "Conquista bloqueada — aguardando lançamento oficial.",
    progresso: "0% (Bloqueado)",
    trofeus: ["#d1d5db"],
  },
];

function PaginaListaConquistas() {
  return (
    <Principal titulo="Lista de Conquistas" voltarPara="/">
      {Conquistas.map((itemConquista, index) => {
        return (
          <div key={index} className="PaginaListaConquistas_item">
        <h3>
           {itemConquista.jogo} — {itemConquista.titulo}
       </h3>
            <p>{itemConquista.descricao}</p>
            <strong>Progresso:</strong> {itemConquista.progresso}
          <br />
            <strong>Troféus desbloqueados:</strong>

        <div className="PaginaListaConquistas_cores">
          {itemConquista.trofeus.map((itemCor, indexCor) => {
            return (
               <div
                key={indexCor}
                className="PaginaListaConquistas_cor-item"
                style={{
                  backgroundColor: itemCor,
              }}
               />
            );
          })}
         </div>
         </div>
       );
     })}
    </Principal>
  );
}

export default PaginaListaConquistas;