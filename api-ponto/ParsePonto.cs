using DTO;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.OpenApi.Validations;

namespace api_ponto
{
    public static class ParsePonto
    {
        public static List<ResponseDTO> Parser(List<PontoDTO> pontos)
        {
            var Employees = GetEmployeeEntry(pontos);
            var Response = MountedResponse(Employees);
            DailyChecks(Response);
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

        private static List<ResponseDTO> MountedResponse(Dictionary<string, List<Entry>> Employees)
        {
            var Response = new List<ResponseDTO>();
            foreach (KeyValuePair<string, List<Entry>> employee in Employees)
            {
                for (int i = 0; i < employee.Value.Count; i += 2)
                {
                    var lstEntry = new List<Entry>();
                    lstEntry.Add(new Entry()
                    {
                        PunchDateTime = employee.Value[i].PunchDateTime,
                        PunchType = employee.Value[i].PunchType
                    });
                    lstEntry.Add(new Entry()
                    {
                        PunchDateTime = employee.Value[i + 1].PunchDateTime,
                        PunchType = employee.Value[i + 1].PunchType
                    });

                    var reponseEmployee = new ResponseDTO()
                    {
                        AmountOfHoursWorked = CalcAmount(lstEntry),
                        EmployeeName = employee.Key,
                        Entries = lstEntry,
                        PunchDate = lstEntry[0].PunchDateTime
                    };
                    Response.Add(reponseEmployee);
                }
            }
            return Response.OrderBy(x => x.PunchDate).ToList();
        }

        private static double CalcAmount(List<Entry> Entries)
        {
            DateTime entryTime = DateTime.MinValue; // somente na declaração, esse valor não vai importar
            DateTime exitTime = DateTime.MaxValue; // somente na declaração, esse valor não vai importar
            foreach (var entry in Entries)
            {
                if (entry.PunchType == 1) entryTime = entry.PunchDateTime;
                exitTime = entry.PunchDateTime;
            }
            var timeResult = exitTime - entryTime;
            if(timeResult.Hours > 6)
            {
                throw new OperationCanceledException("Limite máximo de 6 horas diárias");
            }
            return timeResult.TotalHours;
        }

        private static bool DailyChecks(List<ResponseDTO> dailys)
        {
            DateTime dateTime = DateTime.MinValue;
            string Name = dailys[0].EmployeeName;
            foreach (var daily in dailys)
            {
                if (daily.EmployeeName == Name)
                {
                    if ((daily.PunchDate.Date != dateTime.Date) && (daily.PunchDate - dateTime).TotalHours < 11)
                    {
                        throw new ArgumentException("Intervalo entre as jornadas menor que 11 horas.");
                    }
                    dateTime = daily.PunchDate;
                    Name = daily.EmployeeName;
                }else
                {
                    return true;
                }
            }
            return true;
        }

    }
}
