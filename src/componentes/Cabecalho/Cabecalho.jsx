import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho() {
  return (
    <header className="Cabecalho_root">
      <img
        src="/logoo.png"
        style={{
          width: "44px",
          height: "44px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />

      <Avatar nome="João" />
    </header>
  );
}

export default Cabecalho;
