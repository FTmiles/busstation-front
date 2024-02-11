import axios from "axios";
import config from "config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BusStopTableEdit from "./BusStopTableEdit";
import { useLocation } from 'react-router-dom';

export default function LinePageEdit(){
    const[data, setData] = useState({info:[], routes:[{stopsArr:[]}], name:""});
    const[activeRouteIndexArr, setActiveRouteIndexArr] = useState([0]);
    const {lineId} = useParams();
    
    

    const location = useLocation();

    useEffect(() => {
        if (location.state)
            setData(location.state)

    }, [])

    useEffect(()=>{
        
        
        
        // axios.get(`${config.API_ROOT_PATH}/line/line-eager?id=${lineId}`)
        // .then(response => {
        //     setData(response.data);
        //     setActiveRouteIndex(response.data.routes[0].id);
        // })
    }, [])
    
    const handleRoutesClick = (id) => {
        const index = data.routes.findIndex(el => id === el.id);

        if (!activeRouteIndexArr.includes(index))
            setActiveRouteIndexArr(og => [...og, index]);
        else 
            setActiveRouteIndexArr(og => og.filter(i => i != index));

    }

    const handleChange = (e, path, index) =>{
        const { name, value } = e.target;
        console.log("my....name", name)
        console.log("my....value", value)
        // console.log("ass", data[name][index]["value"]);
        console.log("data", data);
        console.log("my index...", index)
        setData(prevData => {
            const newData = { ...prevData };
            let currentData = newData;
        
            for (let key of path) 
              currentData = currentData[key];

            if (index !== null || index !== undefined)
                currentData[index][name] = value;
            else 
                currentData[name] = value;
        
            return newData;
          });
        
        

        // if (name == "info")
        //     setData(og => {
        //         const copyOg = {...og};
        //         copyOg[name][index]['value'] = value;
        //         return copyOg;
        //     })

        // if (name ==)

    }

    return(
        <main>
            <div className="d-flex flex-row justify-content-between align-items-center">
             <input className="h1 " onChange={e => handleChange(e, ["name"])} value={data.name} />
            <div className="bg-secondary">

            <Link to={`/admin-panel/lines/${lineId}/edit`}
             state={data}
                className="btn btn-success"
            >Save</Link>

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
                                <td>{row.key}</td><td>
                                    <input className="" name="value" onChange={e => handleChange(e, ["info"], index)} value={row.value}/>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                </div>
                <div className="col-12 col-md-6 order-md-1 bg-secondary ">
                    <h2>Route variations:</h2>  
                    <ul className="list-group list-group-numbered">
                        {data.routes.map((row, index)=>(
                              <li className={`list-group-item my-cursor-pointer 
                                ${activeRouteIndexArr.includes(index) ? "active" : ""}`} 
                                key={index}
                                onClick={handleRoutesClick.bind(null,row.id)}>
                                {row.routeNotes || "main route"}
                              </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col bg-success">
                    {activeRouteIndexArr.map(index =>   (
                        <BusStopTableEdit key={index}  activeRoute={data.routes[index]} index={index} handleChange={handleChange}/>    
                    )   )

                        
                    }
                    
                </div>
            </div>


            <div>single line bottoms up!<br/>
              
            </div>
        </main>
    )
}