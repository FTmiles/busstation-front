import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BusStopTable from "../BusStopTable";
import { apiGetLineEager } from "services/user.service.js"

export default function LinePage(){
    const[data, setData] = useState();
    const[activeRouteIndexArr, setActiveRouteIndexArr] = useState([0]);
    const {lineId} = useParams();
    const secondRowColor = "#dedede";

    useEffect(()=>{
        apiGetLineEager(lineId)
        .then(response => {
            setData(response.data);
            console.log("twice her",response.data);
        })
    }, [])

    useEffect(() => {
        console.log("fuck", activeRouteIndexArr);
    }, [activeRouteIndexArr])
    

    const handleRoutesClick = (id) => {
        const index = data.routes.findIndex(el => id === el.id);

        if (!activeRouteIndexArr.includes(index))
            setActiveRouteIndexArr(og => [...og, index]);
        else 
            setActiveRouteIndexArr(og => og.filter(i => i != index));

    }
    if (!data) return (<div>Loading...</div>)
    return(
        <main>
            <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>{data.name}</h1>
            <div className="bg-secondary">
       
            <Link to={`/admin-panel/lines/${lineId}/edit`}
             state={data}
                className="btn btn-primary"
            >Edit</Link>

            </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 order-md-2">
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
                <div className="col-12 col-md-6 order-md-1">
                    <h2>Route variations:</h2>  
                    <ul className="list-group list-group-numbered route-selector ">
                        {data.routes.map((row, index)=>(
                              <li className={`list-group-item my-cursor-pointer  list-group-item-light
                                ${activeRouteIndexArr.includes(index) ? "active" : ""}`} 
                                key={index}
                                onClick={handleRoutesClick.bind(null,row.id)}>
                                {row.routeNotes || "main route"}
                              </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row" style={{background:secondRowColor}}>
                <div className="col ">
                    {activeRouteIndexArr.map(index =>   (
                        <BusStopTable key={index}  activeRoute={data.routes[index]} />    
                    )   )

                        
                    }
                    
                </div>
            </div>


        </main>
    )
}