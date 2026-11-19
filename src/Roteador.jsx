import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaListaConquistas from "./paginas/PaginaListaConquistas/PaginaListaConquistas";
import PaginaListaTaxaVitoria from "./paginas/PaginaListaTaxaVitoria/PaginaListaTaxaVitoria";
import PaginaCadastroJogo from "./paginas/PaginaCadastroJogo/PaginaCadastroJogo";
import PaginaListaJogos from "./paginas/PaginaListaJogos/PaginaListaJogos";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "lista-conquistas",
    element: <PaginaListaConquistas />,
  },
  {
    path: "lista-taxa-vitoria",
    element: <PaginaListaTaxaVitoria />,
  },
  {
    path: "cadastro-jogo/:id?",
    element: <PaginaCadastroJogo />,
  },
  {
    path: "lista-jogos",
    element: <PaginaListaJogos />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;