import CreatableSelect from 'react-select/creatable';
import config from 'config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


let newId = -123;


export default function BusStopTableEdit({activeRoute, handleChange, index, handleRemoveStop, handleAddStop, handleStopCountChange}){
    const [allStops, setAllStops] = useState([{value:"asd", label:"asdf"}]);

    const handleCreate = (newStopName, i) => {
        const createStop = {
            id: newId--,
            name: newStopName
        }
        handleChange(createStop, ["routes", index, "stopsArr"], i)
    
    }
    
    useEffect(() => {
        axios.get(`${config.API_ROOT_PATH}/busstop/get/all`)
        .then(response => setAllStops(response.data));
    }, [])


    return (
        <table className="table d-inline-block ms-4 caption-top" style={{width:"auto"}}>
          <caption>
            <input defaultValue={activeRoute.routeNotes || "main"} name="routeNotes" onChange={e => handleChange(e.target.value, ["routes", index], "routeNotes")} />
            <input type="number" 
                min={activeRoute.stopsArr.findLastIndex(stop=> stop) + 1 || 1}
                value={activeRoute.stopsArr.length}
                className='float-end' style={{width:"3em"}}  
                onChange={e => handleStopCountChange(e.target.value, index)}
                />

            
          </caption>
            <thead>
                <tr>
                <th className='ps-5'>Name</th><th>Distance</th>
                </tr>
            </thead>
            <tbody>
                {activeRoute?.stopsArr.map((stop, i)=>(
                    <tr key={i}>

                        <td className='d-flex align-items-center'>
                        <FontAwesomeIcon icon={faPlus} onClick={handleAddStop.bind(null, index, i)}
                            className='btn btn-outline-secondary btn-small p-0' />
                        <FontAwesomeIcon icon={faMinus} onClick={handleRemoveStop.bind(null, index, i)}
                        className='btn btn-outline-secondary btn-small p-0' />                            
                            <CreatableSelect 
                            options={allStops.map(x => ({value:x, label:x.name}))} 
                            value={{label:stop.name, value:stop}}  
                            onChange={newValue => handleChange(newValue.value, ["routes", index, "stopsArr"], i, 0)}
                            onCreateOption={(newStopName) => handleCreate(newStopName, i)}
                            className={`${stop.id < 0 ? "border border-warning" : ""} flex-grow-1`}
                            />
                            </td>

                        {i < activeRoute.stopsArr.length - 1 ? 
                            <td className="vertical-center">
                                <input 
                                defaultValue={activeRoute.distanceMetersList[i]}
                                onChange={e => handleChange(e.target.value, ["routes", index, "distanceMetersList"], i)}
                                style={{maxWidth:"77px"}}
                                />
                            </td>
                        : ""}

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

