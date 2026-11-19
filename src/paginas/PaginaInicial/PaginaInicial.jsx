import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css"; // Certifique-se de importar o CSS da página

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal titulo="Página Inicial">
      {/* Container Grid que vai deixar 2 botões por linha */}
      <div className="container-botoes">
        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-produtos")}
        >
          Conquistas
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-tarefas")}
        >
          Taxa De Vitoria
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/cadastro-cliente")}
        >
          Cadastrar Jogo
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-clientes")}
        >
          Meus Jogos
        </BotaoCustomizado>
      </div>
    </Principal>
  );
}

export default PaginaInicial;