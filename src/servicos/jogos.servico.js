import {
  buscarNoLocalStorage,
  salvarNoLocalStorage,
} from "./localstorage.servico";

export const salvarJogo = (Jogo) => {
  const Jogos = buscarNoLocalStorage("Jogos") || [];
  if (!Jogo.id) {

    Jogo.id = Date.now();
    Jogos.push(Jogo);
  } else {

    const index = Jogos.findIndex((c) => c.id === Jogo.id);
    Jogos[index] = Jogo;
  }
  
  salvarNoLocalStorage("Jogos", Jogos);
};

export const buscarJogos = () => {
  return buscarNoLocalStorage("Jogos") || [];
};
