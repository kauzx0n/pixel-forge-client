import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import { FaTrash } from "react-icons/fa6";
import "./PaginaListaTaxaVitoria.css";
import {
  buscarNoLocalStorage,
  salvarNoLocalStorage,
} from "../../servicos/localstorage.servico";
import { toast } from "react-toastify";

const jogosIniciais = [
  { id: 1, nome: "GTA VI", vitorias: 0 },
  { id: 2, nome: "Valorant", vitorias: 12 },
  { id: 3, nome: "Fortnite", vitorias: 8 },
  { id: 4, nome: "Roblox", vitorias: 15 },
  { id: 5, nome: "Rust", vitorias: 5 },
];

function PaginaListaTaxaVitoria() {
  const [nomeJogo, setNomeJogo] = useState("");
  const [listaJogos, setListaJogos] = useState(
    buscarNoLocalStorage("TaxaVitoria") || jogosIniciais
  );

  // CREATE - Adicionar novo jogo na lista
  const adicionarJogo = () => {
    if (nomeJogo.trim()) {
      const novoJogo = { id: Date.now(), nome: nomeJogo, vitorias: 0 };
      const listaAtualizada = [...listaJogos, novoJogo];
      setListaJogos(listaAtualizada);
      setNomeJogo("");
      salvarNoLocalStorage("TaxaVitoria", listaAtualizada);
      toast.success("Jogo adicionado!");
    } else {
      toast.error("Digite o nome do jogo!");
    }
  };

  // UPDATE - Somar +1 vitória ao clicar no botão
  const somarVitoria = (id) => {
    const listaAtualizada = listaJogos.map((item) => {
      if (item.id === id) {
        return { ...item, vitorias: item.vitorias + 1 };
      }
      return item;
    });
    setListaJogos(listaAtualizada);
    salvarNoLocalStorage("TaxaVitoria", listaAtualizada);
  };

  // DELETE - Remover jogo
  const removerJogo = (id) => {
    if (confirm("Deseja remover este jogo?")) {
      const listaAtualizada = listaJogos.filter((item) => item.id !== id);
      setListaJogos(listaAtualizada);
      salvarNoLocalStorage("TaxaVitoria", listaAtualizada);
      toast.success("Jogo removido!");
    }
  };

  // Contador simples somando as vitórias de todos os jogos
  let totalVitorias = 0;
  listaJogos.forEach((item) => {
    totalVitorias = totalVitorias + item.vitorias;
  });

  return (
    <Principal titulo="Vitórias por Jogo" voltarPara="/">
      <p className="PaginaListaTaxaVitoria_contador">
        Total de vitórias: <strong>{totalVitorias}</strong>
      </p>

      <CampoCustomizado
        label="Novo Jogo"
        type="text"
        placeholder="Ex: Minecraft"
        value={nomeJogo}
        onChange={(e) => setNomeJogo(e.target.value)}
      />

      <button
        onClick={adicionarJogo}
        className="PaginaListaTaxaVitoria_botao"
      >
        Adicionar Jogo
      </button>

      {/* READ - Listar os jogos */}
      {listaJogos.map((item) => {
        return (
          <div key={item.id} className="PaginaListaTaxaVitoria_item">
            <span>
              <strong>{item.nome}</strong> — Vitórias: {item.vitorias}
            </span>

            <div className="PaginaListaTaxaVitoria_acoes">
              <button
                className="PaginaListaTaxaVitoria_btnMais"
                onClick={() => somarVitoria(item.id)}
                title="Adicionar vitória"
              >
                +
              </button>

              <FaTrash
                color="red"
                cursor="pointer"
                onClick={() => removerJogo(item.id)}
              />
            </div>
          </div>
        );
      })}
    </Principal>
  );
}

export default PaginaListaTaxaVitoria;