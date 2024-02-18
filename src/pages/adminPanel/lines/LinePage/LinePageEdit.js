import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BusStopTableEdit from "./BusStopTableEdit";
import { useLocation } from 'react-router-dom';
import { apiPostLineEager } from "services/user.service";
import { lineInfoLabel } from "utils/myUtils";


export default function LinePageEdit(){
    const[data, setData] = useState();
    const[activeRouteIndexArr, setActiveRouteIndexArr] = useState([0]);
    const {lineId} = useParams();
    let typingDebounce = null;
    const secondRowColor = "#dedede";
    const [validationOn, setValidationOn] = useState(false);


    const location = useLocation();

    useEffect(() => {
        if (location.state)
            setData(location.state)
        console.log("on your own", location.state);
    }, [])

    useEffect(()=>{
        
        
        
        // axios.get(`${config.API_ROOT_PATH}/line/line-eager?id=${lineId}`)
        // .then(response => {
        //     setData(response.data);
        //     setActiveRouteIndex(response.data.routes[0].id);
        // })
    }, [])
    

    const handleSubmit = () => {
        setValidationOn(true);
        console.log("DATA", data);

        //Validation --
        for (let key of Object.keys(data.info)) {
            if (!data.info[key]) return
        }

        for ( let route of data.routes) {
            for (let stopObj of route.stopsArr){
                if (stopObj?.id == undefined) return;
            }
        }
        //ends validation --
        //persist to DB
        console.log("validation passed");
        apiPostLineEager(data)
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

   
 if (!data) return(<div>Loading ...</div>);
    return(
        <main>
            <div className="d-flex flex-row justify-content-between align-items-center">
             <input className="h1" name="name" defaultValue={data.info.name}
                onChange={e => handleChange(e.target.value, ["info"], "name")} 

                style={{ border: validationOn && !data.info.name? "red 3px dashed" : "" }}
                />

            <div>

            <Link to={`/admin-panel/lines/${lineId}`}
                className="btn btn-secondary mx-2"
            >Cancel</Link>

            <Link to={`/admin-panel/lines/${lineId}`}
                // state={data}
                className="btn btn-success"
                onClick={handleSubmit}
            >Save</Link>

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
                              <td>{lineInfoLabel[infoKey]}</td>
                              <td>
                              <input className="" name="value" defaultValue={data.info[infoKey]}
                                    style={{ border: validationOn && !data.info[infoKey]? "red 3px dashed" : "" }}
                                    onChange={e => handleChange(e.target.value, ["info"], infoKey)} />
                                {}</td>
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
                        validationOn={validationOn}
                        />    
                    )   )

                        
                    }
                    
                </div>
            </div>

        </main>
    )
}