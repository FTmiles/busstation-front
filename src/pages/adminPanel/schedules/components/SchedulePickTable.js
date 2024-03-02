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
            const week = [["MONDAY", "M"], ["TUESDAY", "T"], ["WEDNESDAY", "W"], ["THURSDAY", "T"], ["FRIDAY", "F"], ["SATURDAY", "S"], ["SUNDAY", "S"]];
            let days = <div className='d-flex justify-content-between'> 
            {
                week.map((day, i) => (
                    <span style={{fontSize:"0.8rem"}} key={i}
                    className={`rounded-1  ${row.runsOnWeekly.includes(day[0])? "bg-dark" : "my-schedule-picker-faded"} text-white p-1`}>{day[1]}</span>        
                    ))
            }            
 
            
            </div>
            return days;
        }


    return (

        <div className={`d-flex flex-wrap column-gap-3 align-items-start ${className} `} style={{maxWidth:"780px"}}> 
                    {
                        data.length == 0 
                        ? 
                        <div>This line has no schedules yet, create new...</div>
                        :
                        data.map((row, index) => (
                            <div className={`${index === selectedSchedule ? "bg-primary my-active" : ""} p-1`} 
                                key={row.id} onClick={()=>handleClickOpen(index)}>
                            <div className="my-cursor-pointer my-active-scale-down d-flex gap-1">
                                {daysOfWeek(row)}{row.trips.map(t=>generateName(t))}
                            </div>
                            </div>
                            ))
                    }
                        <div>
                        <FontAwesomeIcon className='btn ' icon={faPlus} onClick={handleNewSchedule}
                        />
                        </div>
        </div>  
    )
}
