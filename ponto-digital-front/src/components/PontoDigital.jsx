import { useState } from "react";
import { AdicionaPonto } from "./AdicionaPonto";
import { Tabela } from "./Tabela";

export function PontoDigital() {
  const [model, setModel] = useState(false);
  const [result, setResult] = useState([{
    employeeName: "aaaa",
    punchDate: "01-01-2022",
    entries: [
      {
        punchDateTime: "01-01-2022 07:00",
        punchType: 1
      },
      {
        punchDateTime: "01-01-2022: 17:00",
        punchType: 2
      }
    ],
    amountOfHoursWorked: 77
  }])

  return (
    <div className="ponto-digital">
      <div className="ponto-digital__conteudo">
        <h1>Ponto Digital</h1>
        <button className="ponto-digital__button" onClick={()=> {setModel(!model)}}> + </button>
        <Tabela result={result}/>
      </div>
      <AdicionaPonto model={model} setModel={setModel} setResult={setResult}/>
    </div>
  )
}