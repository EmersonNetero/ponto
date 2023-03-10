import { ConvertDate } from "../utils/dateConvert";

export function Tabela({ result }) {

  let valor = 0;
  const total = result.reduce((acc, curr) => acc + curr.amountOfHoursWorked, valor)
  return (
    <div className="tabela-result">
      <table>
        <caption>{result[0].employeeName}</caption>
        <thead>
          <tr>
            <th>DIA</th>
            <th>ENTRADA 1</th>
            <th>SAIDA 1</th>
            <th>ENTRADA 2</th>
            <th>SAIDA 2</th>
            <th>QTD. HS</th>
          </tr>
        </thead>
        <tbody>
          {result.map((ponto, i) => (
            <tr>
              <td>{ConvertDate(ponto.punchDate)}</td>
              <td>{ponto.entries[0].punchDateTime.split("T")[1]}</td>
              <td>{ponto.entries[1].punchDateTime.split("T")[1]}</td>
              <td></td>
              <td></td>
              <td>{ponto.amountOfHoursWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="tabela__total">
        <thead>
          <tr>
            <th>TOTAL HS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
