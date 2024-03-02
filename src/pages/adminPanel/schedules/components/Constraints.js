
export default function Constraints({schedule, handleChange}){

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
        <div className="mt-4 border border-grey bg-secondary p-3">
            <div className="d-flex gap-4">
                <p>Runs on public holidays:</p>
                <div className="form-check">
                    {console.log("fucccc", schedule.runsOnPublicHolidays)}
                    <input className="form-check-input" type="radio" checked={schedule.runsOnPublicHolidays === false}
                        name="runsOnHolidays" id="flexRadioDefault1" value={false}  
                        onChange={(e) => handleChange(e.target.checked, [] , "runsOnPublicHolidays")} />

                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        No
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" checked={schedule.runsOnPublicHolidays === true}
                        name="runsOnHolidays" id="flexRadioDefault2" value={true} 
                        onChange={(e) => handleChange(e.target.checked, [] , "runsOnPublicHolidays")} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Yes
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