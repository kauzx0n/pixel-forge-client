import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css"; 
// 1. Importando os ícones do react-icons
import { FaGamepad, FaTrophy } from "react-icons/fa";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal titulo="Home">
      <div className="container-botoes">
        
        {/* Botão de Conquistas (com Troféu) */}
        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-produtos")}
        >
          <FaTrophy size={48} color="#f2c94c" />
          <span>Conquistas</span>
        </BotaoCustomizado>

        {/* Botão de Taxa de Vitória (com o texto de 68%) */}
        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-tarefas")}
        >
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>68%</span>
          <span>Taxa De Vitoria</span>
        </BotaoCustomizado>

        {/* Botão de Cadastrar Jogo (com Controle) */}
        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/cadastro-cliente")}
        >
          <FaGamepad size={48} color="#9b51e0" />
          <span>Cadastrar Jogo</span>
        </BotaoCustomizado>

        {/* Botão de Meus Jogos (com Controle) */}
        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-clientes")}
        >
          <FaGamepad size={48} color="#9b51e0" />
          <span>Meus Jogos</span>
        </BotaoCustomizado>
        
      </div>
    </Principal>
  );
}

export default PaginaInicial;