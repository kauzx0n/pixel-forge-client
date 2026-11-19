import { useEffect, useState } from "react";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import { buscarJogos, salvarJogo } from "../../servicos/jogos.servico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroJogo() {
  const navigate = useNavigate();
  
  const [formJogo, setFormJogo] = useState({
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
    const carregarJogo = async () => {
      if (params.id) {
        const listaJogos = await buscarJogos();
        const jogoParaEditar = listaJogos.find(
          (item) => item.id === +params.id
        );
        if (jogoParaEditar) {
          setFormJogo(jogoParaEditar);
        }
      }
    };
    carregarJogo();
  }, [params.id]);

  const salvar = async () => {
    if (formJogo.nome === "") {
      toast.error("Falta o Nome do Jogo!");
      return;
    }

    if (formJogo.dataLancamento === "") {
      toast.error("Falta a Data de Lançamento!");
      return;
    }
    
    if (formJogo.genero === "") {
      toast.error("Falta o Gênero do jogo!");
      return;
    }

    if (formJogo.plataforma === "") {
      toast.error("Falta a Plataforma!");
      return;
    }

    if (formJogo.desenvolvedora === "") {
      toast.error("Falta a Desenvolvedora!");
      return;
    }

    try {
      await salvarJogo(formJogo);
      toast.success("Jogo salvo com sucesso!");
      navigate("/lista-jogos");
    } catch {
      toast.error("Memória do navegador cheia! Limpe o LocalStorage ou use uma imagem menor.");
    }
  };

  const titulo = formJogo.id ? "Editar Jogo" : "Novo Jogo";

  const handleNota = (e) => {
    const input = e.target.value;
    let numeros = input.replace("/10", "").replace(/\D/g, "");

    if (formJogo.nota && input.length < formJogo.nota.length && numeros === formJogo.nota.replace("/10", "").replace(/\D/g, "")) {
      numeros = numeros.slice(0, -1);
    }

    if (numeros === "") {
      setFormJogo({ ...formJogo, nota: "" });
      return;
    }

    let valorFinal = parseInt(numeros, 10);
    if (valorFinal > 10) valorFinal = 10;
    setFormJogo({ ...formJogo, nota: `${valorFinal}/10` });
  };

  const handleTempoJogo = (e) => {
    const input = e.target.value;
    let numeros = input.replace(" horas", "").replace(/\D/g, "");

    if (formJogo.tempoJogo && input.length < formJogo.tempoJogo.length && numeros === formJogo.tempoJogo.replace(" horas", "").replace(/\D/g, "")) {
      numeros = numeros.slice(0, -1);
    }

    if (numeros === "") {
      setFormJogo({ ...formJogo, tempoJogo: "" });
      return;
    }
    setFormJogo({ ...formJogo, tempoJogo: `${numeros.slice(0, 4)} horas` });
  };

  return (
    <Principal titulo={titulo} voltarPara="/">
      
      <CampoCustomizado
        label="Nome Do Jogo"
        placeholder="Ex: The Witcher 3"
        value={formJogo.nome}
        onChange={(e) =>
          setFormJogo({ ...formJogo, nome: e.target.value })
        }
        maxLength={50}
      />

      <CampoCustomizado
        label="Data De Lançamento"
        type="date"
        max="9999-12-31"
        value={formJogo.dataLancamento}
        onChange={(e) =>
          setFormJogo({ ...formJogo, dataLancamento: e.target.value })
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
        value={formJogo.genero}
        list="lista-genero"
        onChange={(e) =>
          setFormJogo({ ...formJogo, genero: e.target.value })
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
        value={formJogo.plataforma}
        list="lista-plataforma"
        onChange={(e) =>
          setFormJogo({ ...formJogo, plataforma: e.target.value })
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
        value={formJogo.desenvolvedora}
        list="lista-desenvolvedora"
        onChange={(e) =>
          setFormJogo({ ...formJogo, desenvolvedora: e.target.value })
        }
        maxLength={50}
      />

      <CampoCustomizado
        label="Nota (0 a 10) (Opcional)"
        placeholder="Ex: 8"
        type="text"
        value={formJogo.nota}
        onChange={handleNota}
      />

      <CampoCustomizado
        label="Tempo de Jogo (Opcional)"
        placeholder="Ex: 120"
        type="text"
        value={formJogo.tempoJogo}
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
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement("canvas");
                  const maxLargura = 300;
                  const escala = maxLargura / img.width;
                  canvas.width = maxLargura;
                  canvas.height = img.height * escala;

                  const ctx = canvas.getContext("2d");
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                  const imagemComprimida = canvas.toDataURL("image/jpeg", 0.7);
                  setFormJogo({ ...formJogo, foto: imagemComprimida });
                };
                img.src = event.target.result;
              };
              reader.readAsDataURL(imagem);
            }
          }}
        />
      </div>

      {formJogo.foto && (
        <div style={{ marginBottom: "20px", position: "relative", display: "inline-block" }}>
          <img
            src={formJogo.foto}
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
            onClick={() => setFormJogo({ ...formJogo, foto: "" })}
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

export default PaginaCadastroJogo;