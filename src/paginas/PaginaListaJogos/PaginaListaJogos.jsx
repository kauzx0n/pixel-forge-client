import { useEffect, useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import { buscarJogos } from "../../servicos/jogos.servico";
import "./PaginaListaJogos.css";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { salvarNoLocalStorage } from "../../servicos/localstorage.servico";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PaginaListaJogos() {
  const navigate = useNavigate();
  const [Jogos, setJogos] = useState([]); // Inicia sempre como lista vazia []
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await buscarJogos();
      // Garante que só salva se realmente vier uma lista (Array)
      if (Array.isArray(dados)) {
        setJogos(dados);
      }
    };
    carregarDados();
  }, []);

  const excluirJogo = (JogoParaExcluir) => {
    if (confirm(`Deseja excluir o jogo: ${JogoParaExcluir.nome}?`)) {
      const JogosAtualizados = Jogos.filter(
        (item) => item.id !== JogoParaExcluir.id
      );
      setJogos(JogosAtualizados);
      salvarNoLocalStorage("Jogos", JogosAtualizados);
      toast.success("Jogo excluído com sucesso!");
    }
  };

  const editarJogo = (JogoParaEditar) => {
    navigate("/cadastro-jogo/" + JogoParaEditar.id);
  };

  return (
    <Principal titulo="Lista de Jogos" voltarPara="/">
      <input
        type="text"
        placeholder="Pesquisar jogos..."
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
        style={{
          marginBottom: "20px",
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {Jogos
        .filter((item) =>
          item.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
        .map((item, index) => {
          return (
            <div key={index} className="PaginaListaJogos_item">
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt={`Capa de ${item.nome}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#ddd",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    Sem foto
                  </div>
                )}

                <h3 style={{ margin: 0 }}>{item.nome}</h3>
              </div>

              <div className="PaginaListaJogos_item_acoes">
                <MdEdit
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => editarJogo(item)}
                />
                <MdDelete
                  size={24}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => excluirJogo(item)}
                />
              </div>
            </div>
          );
        })}

      <div
        className="PaginaListaJogos_botaoAdicionar"
        onClick={() => navigate("/cadastro-jogo")}
      >
        <MdAdd />
      </div>
    </Principal>
  );
}

export default PaginaListaJogos;