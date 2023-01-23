import { useState } from "react";
import { AdicionaPonto } from "./AdicionaPonto";

export function PontoDigital() {
  const [model, setModel] = useState(false);
  return (
    <div className="ponto-digital">
      <div className="ponto-digital__conteudo">
        <h1>Ponto Digital</h1>
        <button className="ponto-digital__button" onClick={()=> {setModel(!model)}}> + </button>
      </div>
      <AdicionaPonto model={model} setModel={setModel}/>
    </div>
  )
}