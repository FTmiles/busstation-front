import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BusStopTableEdit from "./BusStopTableEdit";
import { useLocation } from 'react-router-dom';

export default function LinePageEdit(){
    const[data, setData] = useState({info:[], routes:[{stopsArr:[]}], name:""});
    const[activeRouteIndexArr, setActiveRouteIndexArr] = useState([0]);
    const {lineId} = useParams();
    let typingDebounce = null;
    const secondRowColor = "#dedede";

    

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
    

    const handleSubmit = () => {
        
    }

    const handleRoutesClick = (id) => {
        const index = data.routes.findIndex(el => id === el.id);

        if (!activeRouteIndexArr.includes(index))
            setActiveRouteIndexArr(og => [...og, index]);
        else 
            setActiveRouteIndexArr(og => og.filter(i => i != index));

    }

    const handleChange = (newValue, path, key, debounceTime=200) =>{
        clearTimeout(typingDebounce);

        console.log("Actual data structure - ", data)
        console.log("DEBUG :: newValue", newValue)
        console.log("DEBUG :: path", path)
        console.log("DEBUG :: key", key)

        typingDebounce = setTimeout(() => {
      
            setData(ogData => {
                const newData = { ...ogData };
                let currentStep = newData; //walk the path, deeper and deeper


                if (path !== null && path !== undefined){
                    for (let step of path)
                        currentStep = currentStep[step];
                }

                console.log("current step", currentStep)
                    
                currentStep[key] = newValue;
                    

                return newData;
            });

        }, debounceTime); //debounce
    }


    const handleAddStop = (routeIndex, i, counterEl) => {
        console.log("+1", data, i);
        setData(og => {
            const newData = {...og}
            newData.routes[routeIndex].stopsArr.splice(i+1, 0, "")
            newData.routes[routeIndex].distanceMetersList.splice(i+1, 0, "")
            counterEl.current.value = newData.routes[routeIndex].stopsArr.length;
            return newData
        })
    }

    const handleRemoveStop = (routeIndex, i, counterEl) => {
        setData(og => {
            const newData = {...og}
            newData.routes[routeIndex].stopsArr.splice(i, 1)
            newData.routes[routeIndex].distanceMetersList.splice(i, 1)
            counterEl.current.value = newData.routes[routeIndex].stopsArr.length;
            return newData
        })    }

    const handleStopCountChange = (newValue, index) => {
        console.log("hehe", newValue);
        const lastDefinedIndex = data.routes[index].stopsArr.findLastIndex(stop=> stop.id)
        console.log("last defined", lastDefinedIndex);
        const surplus = newValue - lastDefinedIndex - 1;
        console.log("surplus", surplus)

        if (surplus >= 0)
            setData(og => {
                const newData = {...og};

                newData.routes[index].stopsArr.splice(lastDefinedIndex + 1)
                newData.routes[index].stopsArr.splice(lastDefinedIndex +1,0 ,  ...Array(surplus).fill({}))

                return newData
            })
    }

   

    return(
        <main>
            <div className="d-flex flex-row justify-content-between align-items-center">
             <input className="h1" name="name" defaultValue={data.name}
                onChange={e => handleChange(e.target.value, [], "name")} />
            <div>

            <Link to={`/admin-panel/lines/${lineId}`}
                className="btn btn-secondary mx-2"
            >Cancel</Link>

            <Link to={`/admin-panel/lines/${lineId}/edit`}
                state={data}
                className="btn btn-success"
            >Save</Link>

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
                                <td>{row.key}</td><td>
                                    <input className="" name="value" defaultValue={row.value}
                                    onChange={e => handleChange(e.target.value, ["info", index], "value")} />
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                </div>
                <div className="col-12 col-md-6 order-md-1 ">
                    <h2>Route variations:</h2>  
                    <ul className="list-group list-group-numbered">
                        {data.routes.map((row, index)=>(
                              <li className={`list-group-item my-cursor-pointer list-group-item-light
                                ${activeRouteIndexArr.includes(index) ? "active" : ""}`} 
                                key={index}
                                onClick={handleRoutesClick.bind(null,row.id)}>
                                {row.routeNotes || "main route"}
                              </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row" style={{background: secondRowColor}}>
                <div className="col">
                    {activeRouteIndexArr.map(index =>   (
                        <BusStopTableEdit 
                        key={index} 
                        activeRoute={data.routes[index]} 
                        index={index} 
                        handleChange={handleChange}
                        handleAddStop={handleAddStop}
                        handleRemoveStop={handleRemoveStop}
                        handleStopCountChange={handleStopCountChange}
                        />    
                    )   )

                        
                    }
                    
                </div>
            </div>

        </main>
    )
}