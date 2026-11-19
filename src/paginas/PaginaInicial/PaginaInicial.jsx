import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css"; 
import { FaGamepad, FaTrophy } from "react-icons/fa";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal>
      

      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "32px", fontFamily: "sans-serif" }}>
        <span style={{ color: "#FFFFFF", fontWeight: "900" }}>GAME</span>
        <span style={{ color: "#a855f7", fontWeight: "900" }}>HUB</span>
      </h1>

      <div className="container-botoes">
        

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-produtos")}
        >
          <FaTrophy size={48} color="#f2c94c" />
          <span>Conquistas</span>
        </BotaoCustomizado>


        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-tarefas")}
        >
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>68%</span>
          <span>Taxa De Vitoria</span>
        </BotaoCustomizado>


        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/cadastro-cliente")}
        >
          <FaGamepad size={48} color="#9b51e0" />
          <span>Cadastrar Jogo</span>
        </BotaoCustomizado>


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