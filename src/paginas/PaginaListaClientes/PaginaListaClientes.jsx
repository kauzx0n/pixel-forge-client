import { useEffect, useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import { buscarClientes } from "../../servicos/clientes.servico";
import "./PaginaListaClientes.css";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { salvarNoLocalStorage } from "../../servicos/localstorage.servico";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PaginaListaClientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]); // Inicia sempre como lista vazia []
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await buscarClientes();
      // Garante que só salva se realmente vier uma lista (Array)
      if (Array.isArray(dados)) {
        setClientes(dados);
      }
    };
    carregarDados();
  }, []);

  const excluirCliente = (clienteParaExcluir) => {
    if (confirm(`Deseja excluir o jogo: ${clienteParaExcluir.nome}?`)) {
      const clientesAtualizados = clientes.filter(
        (item) => item.id !== clienteParaExcluir.id
      );
      setClientes(clientesAtualizados);
      salvarNoLocalStorage("clientes", clientesAtualizados);
      toast.success("Jogo excluído com sucesso!");
    }
  };

  const editarCliente = (clienteParaEditar) => {
    navigate("/cadastro-cliente/" + clienteParaEditar.id);
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

      {clientes
        .filter((item) =>
          item.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
        .map((item, index) => {
          return (
            <div key={index} className="PaginaListaClientes_item">
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

              <div className="PaginaListaClientes_item_acoes">
                <MdEdit
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => editarCliente(item)}
                />
                <MdDelete
                  size={24}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => excluirCliente(item)}
                />
              </div>
            </div>
          );
        })}

      <div className="PaginaListaClientes_botaoAdicionar">
        <MdAdd onClick={() => navigate("/cadastro-cliente")} />
      </div>
    </Principal>
  );
}

export default PaginaListaClientes;