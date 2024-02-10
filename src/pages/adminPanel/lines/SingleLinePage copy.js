import axios from "axios";
import config from "config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BusStopTable from "./BusStopTable";


export default function SingleLinePage(){
    const[data, setData] = useState({info:[], routes:[{stopsArr:[]}]});
    const[activeRouteIndex, setActiveRouteIndex] = useState(0);
    const {lineId} = useParams();

    useEffect(()=>{
        axios.get(`${config.API_ROOT_PATH}/line/line-eager?id=${lineId}`)
        .then(response => {
            setData(response.data);
            setActiveRouteIndex(response.data.routes[0].id);
        })
    }, [])
    
    const handleClick = (id) => {
        let index = data.routes.findIndex(el => id === el.id);
        setActiveRouteIndex(index);
        console.log(activeRouteIndex)
    }

    return(
        <main>
            <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>{data.name}</h1>
            <div className="bg-secondary">
                <Link to={`/admin-panel/lines/${lineId}/edit`}  className="btn btn-primary">Edit</Link>
            </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 order-md-2 bg-primary">
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {data.info.map((row, index)=>(
                            <tr key={index}>
                                <td>{row.key}</td><td>{row.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                </div>
                <div className="col-12 col-md-6 order-md-1 bg-secondary ">
                    <h2>Route variations:</h2>  
                    <ul class="list-group list-group-numbered">
                        {data.routes.map(row=>(
                              <li class="list-group-item my-cursor-pointer" 
                                onClick={handleClick.bind(null,row.id)}>
                                {row.routeNotes || "main route"}
                              </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col bg-success">
                    <BusStopTable activeRouteIndex={activeRouteIndex} activeRoute={data.routes[activeRouteIndex]} />
                </div>
            </div>


            <div>single line bottoms up!<br/>
              
            </div>
        </main>
    )
}