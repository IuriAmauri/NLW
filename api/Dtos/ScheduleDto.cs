namespace api.Dtos
{
    public class ScheduleDto
    {
        public int WeekDay { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public int ClassId { get; set; }
    }
}