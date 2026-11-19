import { useEffect, useState } from "react";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import { buscarClientes, salvarCliente } from "../../servicos/clientes.servico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroCliente() {
  const navigate = useNavigate();
  
  const [formCliente, setFormCliente] = useState({
    id: "",
    nome: "",
    dataLancamento: "",
    genero: "",
    plataforma: "",
    desenvolvedora: "",
    nota: "",
    tempoJogo: "",
    foto: "",
  });

  const sugestoesGenero = ["Ação", "Aventura", "RPG", "Sobrevivência", "Terror", "Plataforma", "Mundo Aberto", "FPS", "Corrida", "Luta", "Estratégia"];
  const sugestoesPlataforma = ["PC", "Steam", "Epic Games", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X", "Xbox Series S", "Nintendo Switch", "Mobile"];
  const sugestoesDesenvolvedora = ["CD Projekt Red", "Rockstar Games", "Naughty Dog", "Ubisoft", "EA", "Square Enix", "Nintendo", "Valve", "Capcom", "Bethesda", "FromSoftware"];

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const clienteParaEditar = buscarClientes().find(
        (item) => item.id === +params.id,
      );
      if (clienteParaEditar) {
        setFormCliente(clienteParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (formCliente.nome === "") {
      toast.error("Falta o Nome do Jogo!");
      return;
    }

    if (formCliente.dataLancamento === "") {
      toast.error("Falta a Data de Lançamento!");
      return;
    }
    
    if (formCliente.genero === "") {
      toast.error("Falta o Gênero do jogo!");
      return;
    }

    if (formCliente.plataforma === "") {
      toast.error("Falta a Plataforma!");
      return;
    }

    if (formCliente.desenvolvedora === "") {
      toast.error("Falta a Desenvolvedora!");
      return;
    }

    salvarCliente(formCliente);
    toast.success("Jogo salvo com sucesso!");
    navigate("/lista-clientes");
  };

  const titulo = formCliente.id ? "Editar Jogo" : "Novo Jogo";

  const handleNota = (e) => {
    const input = e.target.value;
    let numeros = input.replace("/10", "").replace(/\D/g, "");

    if (formCliente.nota && input.length < formCliente.nota.length && numeros === formCliente.nota.replace("/10", "").replace(/\D/g, "")) {
      numeros = numeros.slice(0, -1);
    }

    if (numeros === "") {
      setFormCliente({ ...formCliente, nota: "" });
      return;
    }

    let valorFinal = parseInt(numeros, 10);
    if (valorFinal > 10) valorFinal = 10;
    setFormCliente({ ...formCliente, nota: `${valorFinal}/10` });
  };

  const handleTempoJogo = (e) => {
    const input = e.target.value;
    let numeros = input.replace(" horas", "").replace(/\D/g, "");

    if (formCliente.tempoJogo && input.length < formCliente.tempoJogo.length && numeros === formCliente.tempoJogo.replace(" horas", "").replace(/\D/g, "")) {
      numeros = numeros.slice(0, -1);
    }

    if (numeros === "") {
      setFormCliente({ ...formCliente, tempoJogo: "" });
      return;
    }
    setFormCliente({ ...formCliente, tempoJogo: `${numeros.slice(0, 4)} horas` });
  };

  return (
    <Principal titulo={titulo} voltarPara="/">
      
      <CampoCustomizado
        label="Nome Do Jogo"
        placeholder="Ex: The Witcher 3"
        value={formCliente.nome}
        onChange={(e) =>
          setFormCliente({ ...formCliente, nome: e.target.value })
        }
        maxLength={50}
      />

      <CampoCustomizado
        label="Data De Lançamento"
        type="date"
        max="9999-12-31"
        value={formCliente.dataLancamento}
        onChange={(e) =>
          setFormCliente({ ...formCliente, dataLancamento: e.target.value })
        }
      />
      
      <datalist id="lista-genero">
        {sugestoesGenero.map((opcao) => (
          <option key={opcao} value={opcao} />
        ))}
      </datalist>
      <CampoCustomizado
        label="Gênero"
        placeholder="Ex: RPG, Ação, Plataforma"
        value={formCliente.genero}
        list="lista-genero"
        onChange={(e) =>
          setFormCliente({ ...formCliente, genero: e.target.value })
        }
      />
      
      <datalist id="lista-plataforma">
        {sugestoesPlataforma.map((opcao) => (
          <option key={opcao} value={opcao} />
        ))}
      </datalist>
      <CampoCustomizado
        label="Plataforma"
        placeholder="Ex: PC, PlayStation 5, Steam"
        value={formCliente.plataforma}
        list="lista-plataforma"
        onChange={(e) =>
          setFormCliente({ ...formCliente, plataforma: e.target.value })
        }
      />
      
      <datalist id="lista-desenvolvedora">
        {sugestoesDesenvolvedora.map((opcao) => (
          <option key={opcao} value={opcao} />
        ))}
      </datalist>
      <CampoCustomizado
        label="Desenvolvedora"
        placeholder="Ex: CD Projekt Red"
        value={formCliente.desenvolvedora}
        list="lista-desenvolvedora"
        onChange={(e) =>
          setFormCliente({ ...formCliente, desenvolvedora: e.target.value })
        }
        maxLength={50}
      />

      <CampoCustomizado
        label="Nota (0 a 10) (Opcional)"
        placeholder="Ex: 8"
        type="text"
        value={formCliente.nota}
        onChange={handleNota}
      />

      <CampoCustomizado
        label="Tempo de Jogo (Opcional)"
        placeholder="Ex: 120"
        type="text"
        value={formCliente.tempoJogo}
        onChange={handleTempoJogo}
      />

      <div style={{ width: "50%", minWidth: "250px", maxWidth: "400px" }}>
        <CampoCustomizado
          type="file"
          accept="image/*"
          label="Capa do Jogo (Opcional)"
          onChange={(e) => {
            const imagem = e.target.files[0];
            if (imagem) {
              const reader = new FileReader();
              reader.onload = (event) => {
                setFormCliente({ ...formCliente, foto: event.target.result });
              };
              reader.readAsDataURL(imagem);
            }
          }}
        />
      </div>

      {formCliente.foto && (
        <div style={{ marginBottom: "20px", position: "relative", display: "inline-block" }}>
          <img
            src={formCliente.foto}
            alt="Capa do Jogo"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />

          <button
            onClick={() => setFormCliente({ ...formCliente, foto: "" })}
            style={{
              position: "absolute",
              top: "5px",
              right: "8px",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "0"
            }}
            title="Remover Capa"
          >
            X
          </button>
        </div>
      )}

      <button 
        onClick={salvar}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#1a1a2e",
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        }}
      >
        Salvar Jogo
      </button>

    </Principal>
  );
}

export default PaginaCadastroCliente;