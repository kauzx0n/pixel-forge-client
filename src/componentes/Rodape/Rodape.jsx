import "./Rodape.css";

function Rodape() {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className="Rodape_root">
      <span>Copyright © {anoAtual} - Todos os direitos reservados - Kauan</span>
    </footer>
  );
}

export default Rodape;
