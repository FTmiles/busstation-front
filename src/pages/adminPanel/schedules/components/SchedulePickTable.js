import { faArrowLeft, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SchedulePickTable({data}) {
    
    
    
    const generateName = (row) => {
        let name;
        if (row.boundFor === "CITY_BOUND") name = <FontAwesomeIcon icon={faArrowLeft} style={{transform: "scaleX(-1)"}} />
        else if (row.boundFor === "OUT_BOUND") name = <FontAwesomeIcon icon={faArrowLeft} />
        else if (row.boundFor === "CIRCLE") name = <FontAwesomeIcon icon={faRotateLeft} />
        
        const [hours, mins] = row?.timeList[0].split(":")
        name = <span>{name} {`${hours}:${mins}`}</span>; 

        return name;
    }

        const daysOfWeek = (row) => {
            let days = <div className='d-inline-block'> 
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
        <table onClick={() => console.log(data)} className="table" style={{width:"auto"}}>
            <thead>
                <tr>
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                <tr key={row.id}>
                <td>{daysOfWeek(row)}<div>{generateName(row)} {generateName(row)}</div></td>
                </tr>
                ))}

                </tbody>
        </table>
    )
}
