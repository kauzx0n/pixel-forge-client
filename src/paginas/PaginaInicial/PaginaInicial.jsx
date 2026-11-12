import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaInicial.css"

import { useNavigate } from "react-router-dom";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal titulo="Game-Hub Center">
      <div className="botaoInicial_root">

      <BotaoCustomizado
        tipo="primario"
        aoClicar={() => navigate("/lista-produtos")}
        >
        Conquistas
      </BotaoCustomizado>

      <BotaoCustomizado
        tipo="secundario"
        aoClicar={() => navigate("/lista-tarefas")}
        >
        Lista de Tarefas
      </BotaoCustomizado>

      <BotaoCustomizado
        tipo="primario"
        aoClicar={() => navigate("/cadastro-cliente")}
        >
        Meus Jogos
      </BotaoCustomizado>

      <BotaoCustomizado
        tipo="secundario"
        aoClicar={() => navigate("/lista-clientes")}
        >
        Taxas Globais
      </BotaoCustomizado>
        </div>
    </Principal>
  );
}
export default PaginaInicial;
