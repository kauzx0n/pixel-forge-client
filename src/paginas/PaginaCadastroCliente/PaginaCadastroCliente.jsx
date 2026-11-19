/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import {
  formatarComMascara,
  MASCARA_CPF,
  MASCARA_TELEFONE,
} from "../../utils/formatarComMascara";
import { toast } from "react-toastify";
import validarCPF from "../../utils/validarCPF";
import validarEmail from "../../utils/validarEmail";
import { buscarClientes, salvarCliente } from "../../servicos/clientes.servico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroCliente() {
  const navigate = useNavigate();
  const [formCliente, setFormCliente] = useState({
    id: "",
    nome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
  });

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
    if (!formCliente.nome.trim() || !formCliente.email.trim()) {
      toast.error("Os campos nome e email são obrigatórios!");
      return;
    }

    if (!validarEmail(formCliente.email)) {
      toast.error("Email inválido!");
      return;
    }

    if (formCliente.cpf.trim() && !validarCPF(formCliente.cpf)) {
      toast.error("CPF inválido!");
      return;
    }

    salvarCliente(formCliente);
    toast.success("Cliente salvo com sucesso!");
    navigate("/lista-clientes");
  };

  const titulo = formCliente.id ? "Editar Jogos" : "Novo jogo";

  return (
    <Principal titulo={titulo} voltarPara="/">
      <CampoCustomizado
        label="Nome Do Jogo"
        value={formCliente.nome}
        onChange={(e) =>
          setFormCliente({ ...formCliente, nome: e.target.value })
        }
        maxLength={50}
      />
      
        
      
      <CampoCustomizado
        label="Data De Lançamento"
        type="date"
        value={formCliente.dataLancamento}
        onChange={(e) =>
          setFormCliente({ ...formCliente, dataLancamento: e.target.value })
        }
      />
      <CampoCustomizado
        label="Gênero"
        value={formCliente.genero}
        onChange={(e) =>
          setFormCliente({
            ...formCliente,
            genero: e.target.value,
          })
        }
      />
      <CampoCustomizado
        label="Plataforma"
        value={formCliente.plataforma}
        onChange={(e) =>
          setFormCliente({
            ...formCliente,
            plataforma: e.target.value,
          })
        }
      />
      <CampoCustomizado
        label="Desenvolvedora"
        value={formCliente.desenvolvedora}
        onChange={(e) =>
          setFormCliente({ ...formCliente, desenvolvedora: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Nota"
        value={formCliente.nota}
        onChange={(e) =>
          setFormCliente({
            ...formCliente,
            nota: e.target.value,
          })
        }
      />
      <CampoCustomizado
        label="Tempo de Jogo"
        value={formCliente.tempoJogo}
        onChange={(e) =>
          setFormCliente({
            ...formCliente,
            tempoJogo: e.target.value,
          })
        }
      />
      


<CampoCustomizado
       type="file"
       accept="image/*"
       label="Capa do Jogo"
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

     {formCliente.foto && (
       <div>
         <img
           src={formCliente.foto}
           alt="Foto do Cliente"
           style={{
             width: "150px",
             height: "150px",
             objectFit: "cover",
             borderRadius: "8px",
           }}
         />
       </div>
     )}


      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroCliente;
