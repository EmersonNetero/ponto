using System.ComponentModel.DataAnnotations;

namespace DTO
{
    public class Entry
    {
        [Required]
        public DateTime PunchDateTime { get; set; }
        [Required]
        public int PunchType { get; set; }
    }
}
