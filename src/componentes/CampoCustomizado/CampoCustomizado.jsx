import "./CampoCustomizado.css";

function CampoCustomizado(props) {
  return (
    <div className="CampoCustomizado_root">
      <label>{props.label}</label>
      <input {...props} className="CampoCustomizado_input" />
    </div>
  );
}

export default CampoCustomizado;
