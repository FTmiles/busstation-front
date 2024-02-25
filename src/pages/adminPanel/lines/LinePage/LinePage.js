import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BusStopTable from "../BusStopTable";
import { apiGetLineFull, apiDelLine } from "services/user.service.js"
import { lineInfoLabel } from "utils/myUtils";

export default function LinePage(){
    const[data, setData] = useState();
    const[activeRouteIndexArr, setActiveRouteIndexArr] = useState([0]);
    const {lineId} = useParams();
    const secondRowColor = "#dedede";

    useEffect(()=>{
        apiGetLineFull(lineId)
        .then(response => {
            setData(response.data);
            console.log("JSON from BACK",response.data);
        })
    }, [])

    

    const handleRoutesClick = (id) => {
        const index = data.routes.findIndex(el => id === el.id);

        if (!activeRouteIndexArr.includes(index))
            setActiveRouteIndexArr(og => [...og, index]);
        else 
            setActiveRouteIndexArr(og => og.filter(i => i != index));
    }

    const handleDeleteLine = () => {
        apiDelLine(lineId)
    }


    if (!data) return (<div>Loading...</div>)
    return(
        <main>
            <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>{data.info.name}</h1>
            <div className="">
       
            <Link to={`/admin-panel/lines/${lineId}/edit`}
             state={data}
                className="btn btn-primary"
            >Edit</Link>

            <Link to={`/admin-panel/lines/`}
                className="btn btn-danger mx-2"
                onClick={handleDeleteLine}
            >Del {data.info.name}</Link>

            </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 order-md-2">
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {Object.keys(lineInfoLabel).map((infoKey, index) => (
                            <tr key={index}>
                              <td>{lineInfoLabel[infoKey]}</td><td>{data.info[infoKey]}</td>
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