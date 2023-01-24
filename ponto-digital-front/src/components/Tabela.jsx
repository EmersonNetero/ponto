function ConvertDate(stringDate) {
  const newDate = stringDate.split('-')
  
  let auxTrade = newDate[2].split('T')[0]
  newDate[2] = newDate[0]
  newDate[0] = auxTrade
  return newDate.join('/')
}


export function Tabela({result}) {
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
    </div>
  )
}