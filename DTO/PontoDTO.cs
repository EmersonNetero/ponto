using System.ComponentModel.DataAnnotations;

namespace DTO
{
    public class PontoDTO
    {
        [Required]
        public DateTime PunchDateTime { get; set; }
        [Required]
        public int PunchType { get; set; }
        [Required]
        public string EmployeeName { get; set; }
    }
}
