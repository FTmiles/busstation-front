import { faArrowLeft, faRotateLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SchedulePickTable({data, className, handleNewSchedule, selectedSchedule, handleClickOpen}) {
    
    
    
    const generateName = (trip) => {
        if (!trip.boundFor || !trip.timeList[0]) return "Dir & Time"
        let name;
        if (trip.boundFor === "OUT_BOUND") name = <FontAwesomeIcon icon={faArrowLeft} style={{width: "16px",transform: "scaleX(-1)"}} />
        else if (trip.boundFor === "CITY_BOUND") name = <FontAwesomeIcon icon={faArrowLeft} style={{ width: "16px"}} />
        else if (trip.boundFor === "CIRCLE") name = <FontAwesomeIcon icon={faRotateLeft} style={{ width: "16px"}} />
        
        const [hours, mins] = trip?.timeList[0].split(":")
        name = <span key={trip.id}>{name} {`${hours}:${mins}`}</span>; 

        return name;
    }

        const daysOfWeek = (row) => {
            let days = <div className='d-flex justify-content-between'> 
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("MONDAY")? "bg-dark" : "bg-secondary"} text-white p-1`}>M</span>    
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("TUESDAY") ? "bg-dark" : "bg-secondary"} text-white p-1`}>T</span>    
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("WEDNESDAY") ? "bg-dark" : "bg-secondary"} text-white p-1`}>W</span>    
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("THURSDAY") ? "bg-dark" : "bg-secondary"} text-white p-1`}>T</span>    
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("FRIDAY") ? "bg-dark" : "bg-secondary"} text-white p-1`}>F</span>    
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("SATURDAY") ? "bg-dark" : "bg-secondary"} text-white p-1`}>S</span>    
            <span style={{fontSize:"0.8rem"}} className={`rounded-1  ${row.runsOnWeekly.includes("SUNDAY") ? "bg-dark" : "bg-secondary"} text-white p-1`}>S</span>    
            
            </div>
            return days;
        }


    return (
        <div className={className}>
            <table className="table" style={{width:"auto"}}>
                <thead>
                    <tr>
                    <th>Schedule</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length == 0 
                        ? 
                        <tr><td>This line has no schedules yet, create new...</td></tr>
                        :
                        data.map((row, index) => (
                            <tr className={index === selectedSchedule ? "my-active-shadow" : ""} key={row.id} onClick={()=>handleClickOpen(index)}>
                            <td><div className="my-cursor-pointer my-active-scale-down">
                                {daysOfWeek(row)}<div className='d-flex gap-3'>{row.trips.map(t=>generateName(t))}</div>
                                </div></td>
                            </tr>
                            ))
                    }
                    <tr>
                        <td className='text-center'>
                        <FontAwesomeIcon className='btn ' icon={faPlus} onClick={handleNewSchedule}
                        />
                        </td>
                    </tr>
                    </tbody>
            </table>
        </div>
    )
}
