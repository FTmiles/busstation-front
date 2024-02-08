import axios from "axios";
import config from "config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function SingleLine(){
    const[data, setData] = useState({info:[], routes:[]});
    const {lineId} = useParams();

    useEffect(()=>{
        axios.get(`${config.API_ROOT_PATH}/line/line-eager?id=${lineId}`)
        .then(response => setData(response.data))
    }, [])
    
    return(
        <main>
            <h1>{data.name}</h1>

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
                    <div class="list-group list-group-numbered">
                        {data.routes.map(row=>(
                            <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                {row.routeNotes || "main"}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col bg-success">
                    <table>

                    </table>
                </div>
            </div>


            <div>single line bottoms up!<br/>
              
            </div>
        </main>
    )
}