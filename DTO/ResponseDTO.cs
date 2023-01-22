using System.ComponentModel.DataAnnotations;

namespace DTO
{
    public class ResponseDTO
    {
        [Required]
        public string EmployeeName { get; set; }
        [Required]
        public DateTime PunchDate { get; set; }
        [Required]
        public List<Entry>? Entries { get; set; }
        [Required]
        public float AmountOfHoursWorked { get; set; }
    }
}
