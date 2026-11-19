import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css";
import { FaGamepad, FaTrophy } from "react-icons/fa";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "32px",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#FFFFFF", fontWeight: "900" }}>GAME</span>
        <span style={{ color: "#a855f7", fontWeight: "900" }}>HUB</span>
      </h1>

      <div className="container-botoes">
        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-conquistas")}
        >
          <FaTrophy size={48} color="#f2c94c" />
          <span>Conquistas</span>
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-taxa-vitoria")}
        >
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>68%</span>
          <span>Taxa De Vitoria</span>
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/cadastro-jogo")}
        >
          <FaGamepad size={48} color="#9b51e0" />
          <span>Cadastrar Jogo</span>
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="telaInicial"
          aoClicar={() => navigate("/lista-jogos")}
        >
          <FaGamepad size={48} color="#9b51e0" />
          <span>Meus Jogos</span>
        </BotaoCustomizado>
      </div>

      {/* Card decorativo de gráfico + ranking */}
      <div
        style={{
          backgroundColor: "#1c1c24",
          borderRadius: "20px",
          padding: "20px",
          marginTop: "24px",
          marginBottom: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Gráfico de pizza simples feito apenas com CSS */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            margin: "0 auto 18px auto",
            background:
              "conic-gradient(#9b51e0 0% 22%, #4ade80 22% 60%, #38bdf8 60% 82%, #fb923c 82% 100%)",
          }}
        />

        <hr style={{ border: "none", borderTop: "1px solid #2e2e3a", marginBottom: "14px" }} />

        <p style={{ fontSize: "13px", margin: "0 0 10px 0", color: "#d4d4d8" }}>
          <strong>SEU RANKING</strong> (Amigos/Global)
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px", color: "#e4e4e7" }}>
          <span>1. Stadarn Player</span>
          <span>195h</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px", color: "#e4e4e7" }}>
          <span>2. Cameri60S</span>
          <span>135h</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#e4e4e7" }}>
          <span>3. RepsMadeig</span>
          <span>120h</span>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaInicial;