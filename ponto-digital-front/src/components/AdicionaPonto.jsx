import classNames from "classnames"
import { useRef } from "react";
import { Ponto } from "../services/api";


export function AdicionaPonto({model, setModel, setResult}) {

  const nomeRef = useRef(null)
  const entradaRef = useRef(null)
  const saidaRef = useRef(null)

  const cn = classNames("adiciona-ponto", {
    "adiciona-model": model
  })

  const handleModel = () => {
    setModel(!model);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ed = {
      "PunchDateTime": entradaRef.current.value,
      "PunchType": 1,
      "EmployeeName": nomeRef.current.value
    }

    const d = {
      "PunchDateTime": saidaRef.current.value,
      "PunchType": 2,
      "EmployeeName": nomeRef.current.value
    }
    const res = await Ponto([ed, d]);

    
      setResult((prev) => {
        if(prev[0].amountOfHoursWorked == 77) { // valor padrão da inicialização do objeto
          return res.data
        }
        return [...prev, ...res.data]
      })
    
    setModel(!model);
  }

  return (
    <div className={cn}>
      <div className="adiciona-ponto__caixa">
        <button className="adiciona-ponto__fechar"onClick={handleModel}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Nome:</label>
            <input type="text" className="adiciona-ponto__input" ref={nomeRef}/>
            <label htmlFor="">Entrada:</label>
            <input type="datetime-local" className="adiciona-ponto__input" ref={entradaRef}/>
            <label htmlFor="">Saída:</label>
            <input type="datetime-local"className="adiciona-ponto__input" ref={saidaRef}/>
          </div>
          <button className="adiciona-ponto__button" type="submit">Bater ponto</button>
        </form>
      </div>
    </div>
  )
}