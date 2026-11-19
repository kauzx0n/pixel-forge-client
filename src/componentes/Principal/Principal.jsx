import { MdHome, MdEmojiEvents, MdPeople, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Principal.css";
import { IoArrowBackCircle } from "react-icons/io5";

function Principal(props) {
  return (
    <main className="Principal_root">
      <div className="Principal_titulo">
        {props.voltarPara && (
          <Link to={props.voltarPara} style={{ color: "inherit" }}>
            <IoArrowBackCircle size={24} />
          </Link>
        )}

        <h2>{props.titulo}</h2>
      </div>


      <div style={{ paddingBottom: "90px" }}>
        {props.children}
      </div>

  
      <nav className="barra-navegacao">
        <Link to="/" className="nav-item ativo" style={{ textDecoration: "none" }}>
          <MdHome size={28} />
          <span>Início</span>
        </Link>
        <div className="nav-item">
          <MdEmojiEvents size={28} />
          <span>Rank</span>
        </div>
        <div className="nav-item">
          <MdPeople size={28} />
          <span>Amigos</span>
        </div>
        <div className="nav-item">
          <MdPerson size={28} />
          <span>Perfil</span>
        </div>
      </nav>
    </main>
  );
}

export default Principal;