import CreatableSelect from 'react-select/creatable';
import config from 'config';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function BusStopTableEdit({activeRoute, handleChange, index}){
    const [allStops, setAllStops] = useState([{value:"asd", label:"asdf"}]);
    
    useEffect(() => {
        axios.get(`${config.API_ROOT_PATH}/busstop/alldto`)
        .then(response => setAllStops(response.data));
    }, [])

    console.log("from inners", activeRoute);
    return (
        <table className="table d-inline-block ms-4 caption-top" style={{width:"auto"}}>
          <caption><input value={activeRoute.routeNotes || "main"} name="routeNotes" onChange={e => handleChange(e, ["routes"], index)} /></caption>
            <thead>
                <tr>
                <th>Name</th><th>Distance</th>
                </tr>
            </thead>
            <tbody>
                {activeRoute?.stopsArr.map((stop, i)=>(
                    <tr key={i}>
                        <td>
                            <input value={stop?.name} />
                            <CreatableSelect 
                            isClearable 
                            options={allStops} 
                            value={{label:stop.name, value:stop.id}}  
                            name="routeNotes" 
                            onChange={e => handleChange(e, ["routes"], i, )}
                            />
                            </td>
                        <td className="vertical-center">
                             <input value={activeRoute.distanceMetersArr[i]?.distanceMeters}/>
                         </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

