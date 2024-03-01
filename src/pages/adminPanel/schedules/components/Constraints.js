
export default function Constraints({ schedule}){

    const weekDays = [
        { value: "MONDAY", label: "Monday" },
        { value: "TUESDAY", label: "Tuesday" },
        { value: "WEDNESDAY", label: "Wednesday" },
        { value: "THURSDAY", label: "Thursday" },
        { value: "FRIDAY", label: "Friday" },
        { value: "SATURDAY", label: "Saturday" },
        { value: "SUNDAY", label: "Sunday" }
    ];

    return(
        <div className="mt-4">
            <div className="d-flex gap-4">
                <p>Runs on public holidays:</p>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="runsOnHolidays" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Yes
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="runsOnHolidays" id="flexRadioDefault2"   />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        No
                    </label>
                </div>
            </div>

            {/* ------------------WEEKDAYS------------------ */}
            <div className="d-flex gap-4">
            <p>Days of week:</p>
            <div>
            {weekDays.map((day, index) => (
                <div className="form-check" key={index}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={day.value}
                        id={`weekDay${index + 1}`}
                        defaultChecked={schedule.runsOnWeekly.includes(day.value)}
                        readOnly // Prevents user interaction with checkboxes
                    />
                    <label className="form-check-label" htmlFor={`weekDay${index + 1}`}>
                        {day.label}
                    </label>
                </div>
            ))}
        </div>


            </div>
        </div>
      
    )
}