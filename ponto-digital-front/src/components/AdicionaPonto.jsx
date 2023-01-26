import classNames from "classnames";
import { useRef } from "react";
import { Ponto } from "../services/api";
import { useState } from "react";
import { ConvertDate } from "../utils/dateConvert";

export function AdicionaPonto({ model, setModel, setResult }) {
  const nomeRef = useRef(null);
  const entradaRef = useRef(null);
  const saidaRef = useRef(null);
  const [pontos, setPontos] = useState([]);

  const cn = classNames("adiciona-ponto", {
    "adiciona-model": model,
  });

  const handleModel = () => {
    setModel(!model);
    setPontos([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const ed = {
    //   PunchDateTime: entradaRef.current.value,
    //   PunchType: 1,
    //   EmployeeName: nomeRef.current.value,
    // };

    // const d = {
    //   PunchDateTime: saidaRef.current.value,
    //   PunchType: 2,
    //   EmployeeName: nomeRef.current.value,
    // };
    const res = await Ponto(pontos);

    setResult((prev) => {
      if (prev[0].amountOfHoursWorked == 77) {
        // valor padrão da inicialização do objeto
        return res.data;
      }
      return [...prev, ...res.data];
    });

    setModel(!model);
  };

  const addPonto = () => {
    if (entradaRef.current.value && saidaRef.current.value) {
      const ponto1 = {
        PunchDateTime: entradaRef.current.value,
        PunchType: 1,
        EmployeeName: nomeRef.current.value,
      };
      const ponto2 = {
        PunchDateTime: saidaRef.current.value,
        PunchType: 2,
        EmployeeName: nomeRef.current.value,
      };

      setPontos((prev) => [...prev, ...[ponto1, ponto2]]);
      entradaRef.current.value = "";
      saidaRef.current.value = "";
    }
  };

  return (
    <div className={cn}>
      <div className="adiciona-ponto__caixa">
        <button className="adiciona-ponto__fechar" onClick={handleModel}>
          X
        </button>
        <form>
          <div>
            <label htmlFor="">Nome:</label>
            <input
              type="text"
              className="adiciona-ponto__input"
              ref={nomeRef}
            />
            <label htmlFor="">Entrada:</label>
            <input
              type="datetime-local"
              className="adiciona-ponto__input"
              ref={entradaRef}
            />
            <label htmlFor="">Saída:</label>
            <input
              type="datetime-local"
              className="adiciona-ponto__input"
              ref={saidaRef}
            />
          </div>
        </form>
        <button onClick={addPonto} className="adiciona-ponto__button">
          Adicionar
        </button>
        <button
          className="adiciona-ponto__button"
          type="submit"
          onClick={handleSubmit}
        >
          Criar Tabela
        </button>
        <div className="adiciona-ponto__pontos">
          {pontos.map((ponto, index) => (
            index % 2 === 0 && <p key={index}>Diaria {ConvertDate(ponto.PunchDateTime)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
