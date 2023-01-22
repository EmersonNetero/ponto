using DTO;
using Microsoft.OpenApi.Validations;

namespace api_ponto
{
    public static class ParsePonto
    {
        public static List<ResponseDTO> Parser(List<PontoDTO> pontos)
        {
            var Employees = GetEmployeeEntry(pontos);
            var Response = new List<ResponseDTO>();
            foreach (KeyValuePair<string, List<Entry>> employee in Employees)
            {
                var reponseEmployee = new ResponseDTO()
                {
                    AmountOfHoursWorked = CalcAmount(employee.Value),
                    EmployeeName = employee.Key,
                    Entries = employee.Value,
                    PunchDate = employee.Value[0].PunchDateTime.Date
                };
                Response.Add(reponseEmployee);
            }
            return Response;
        }

        private static Dictionary<string, List<Entry>> GetEmployeeEntry(List<PontoDTO> pontos)
        {
            var employees = new Dictionary<string, List<Entry>>();
            var lstEmployeesNamesVisited = new List<string>();
            foreach (var ponto in pontos)
            {
                if (!lstEmployeesNamesVisited.Contains(ponto.EmployeeName))
                {
                    employees.Add(ponto.EmployeeName, new List<Entry>());
                    lstEmployeesNamesVisited.Add(ponto.EmployeeName);
                }

            }

            foreach (var employee in pontos)
            {
                employees[employee.EmployeeName].Add(new Entry() 
                { 
                    PunchDateTime = employee.PunchDateTime, 
                    PunchType = employee.PunchType 
                });
            }

            return employees;
        }

        private static float CalcAmount(List<Entry> Entries)
        {
            float amount = 0;
            DateTime entryTime = DateTime.MinValue; // somente na declaração, esse valor não vai importar
            DateTime exitTime = DateTime.MaxValue; // somente na declaração, esse valor não vai importar
            foreach (var entry in Entries)
            {
                if (entry.PunchType == 1) 
                { 
                    entryTime = entry.PunchDateTime;
                }else
                {
                    exitTime = entry.PunchDateTime;
                    var timeResult = exitTime - entryTime;
                    amount += timeResult.Hours;
                } 
            }
            return amount;
        }

    }
}
