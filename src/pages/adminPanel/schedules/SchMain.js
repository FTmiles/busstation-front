import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiGetSchedules, apiGetRoutesByLine } from "services/user.service";
import { faArrowLeft, faRotateLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SchedulePickTable from "./components/SchedulePickTable";
import Timetable from "./components/Timetable";
import Constraints from "./components/Constraints";

//if they were within the default function, their value would reset after each re-render, not good
let newId = -6321;
let flagGimmeLastSchedule = false;
let timeoutId;
let typingDebounce = null;

export default function SchMain(){
    const {lineId} = useParams();
    const [data, setData] = useState();
    const [staticData, setStaticData] = useState();
    const [selectedSchedule, setSelectedSchedule] = useState(0);
    const [routes, setRoutes] = useState();
    const [showValidationFailedMsg, setShowValidationFailedMsg] = useState(false);


     useEffect(() => {
        apiGetSchedules(lineId).then(response => {
            setData(response.data.data)
            setStaticData({
                "emptySchedule": response.data.empty,
                "boundForOptions": response.data.boundForOptions
            })
        });
        apiGetRoutesByLine(lineId).then(response => setRoutes(response.data));
    }, [])

const logDataFunk = () => {
    console.log("data", data);
    console.log("routes", routes);
    console.log("staticData.emptySchedule", staticData)
}

const handleRouteChange = (newRouteId, tripIndex) => {
    setData(og => {
        const newData = [...og];

        newData[selectedSchedule].trips[tripIndex].routeId = newRouteId;
        console.log("new data man", newData);
        return newData;
    })
}

const handleReverseStops = (val, tripIndex) => {
    console.log("reverse value is", val)
    setData(og => {
        const newData = [...og];
        newData[selectedSchedule].trips[tripIndex].routeDirReversed = val;
        return newData;
    })
}



const handleNewSchedule = () => {
    //add routes[0].id (first by default) to the schedule > trip 
    //deeper copy, avoids staticData mutation
    const empty = {...staticData.emptySchedule};
    empty.trips = [{...staticData.emptySchedule.trips[0]}]
    empty.trips[0].routeId = routes[0].id;

    setData(og => [...og, empty])
    
    //combined with the following useEffect, helps change selectedSchedule to the newly created one
    flagGimmeLastSchedule = true;

}
useEffect(() => {
    if (flagGimmeLastSchedule) {
        setSelectedSchedule(data.length - 1);
        flagGimmeLastSchedule = false;
    }
},[data])



const handleClickOpen = (index) => {
    setSelectedSchedule(index);
}

const handleChange = (newValue, path, key, debounceTime=200) =>{
    clearTimeout(typingDebounce);
    typingDebounce = setTimeout(() => {
  
        setData(ogData => {
            const newData = [...ogData];
            let currentStep = newData[selectedSchedule]; //walk the path, deeper and deeper

            if (path !== null && path !== undefined){
                for (let step of path)
                    currentStep = currentStep[step];
            }

            currentStep[key] = newValue;
            return newData;
        });
    }, debounceTime); //debounce
}


const handleSubmit = () => {
    //make sure bus stops and time point numbers are equal
    const dataCopy = JSON.parse(JSON.stringify(data))

    dataCopy.forEach(schedule =>{
        schedule.trips.forEach(trip =>{
            const matchingRoute = routes.find(route => route.id === trip.routeId);
            trip.timeList = evenOutArrays(matchingRoute.stopsArr, trip.timeList);
        })
    })

    setData(dataCopy);
    
    //if big main validation fails
    if (!isAllDataValid(dataCopy)){
        setShowValidationFailedMsg(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setShowValidationFailedMsg(false);
        }, 3000); // 3 seconds
    }

}


const isAllDataValid = (data) => {
    //each schedule
    for (const schedule of data) {

    //constraints
        if (schedule.runsOnWeekly.length === 0) return false
        if (!schedule.runsOnYearly) return false
    //each trip
        for (const trip of schedule.trips) {

    //each time
            for (const time of trip.timeList) {
                if (!time) return false;
            }
        
        }
    }

    return true;
}

function evenOutArrays(arr1, arr2) {
    const lengthDiff = arr1.length - arr2.length;
    
    if (lengthDiff > 0) {
        // Second array is shorter, so add empty values to match length
        for (let i = 0; i < lengthDiff; i++) {
            arr2.push(null); // You can use any value you consider as empty
        }
    } else if (lengthDiff < 0) {
        // Second array is longer, so truncate it to match length
        arr2.splice(arr1.length);
    }
    
    return arr2;
}

const handleDeleteTrip = (delTrip) => {
    setData(og => {
        const dataCopy = JSON.parse(JSON.stringify(data))
        dataCopy[selectedSchedule].trips = dataCopy[selectedSchedule].trips
                                            .filter(trip => trip.id !== delTrip.id)
        return dataCopy;
    })
}

const handleAddTrip = () => {
    setData(og => {
        const dataCopy = JSON.parse(JSON.stringify(data))
        const id = newId--;

        const emptyTrip = staticData.emptySchedule.trips[0];
        emptyTrip.id = id;
        emptyTrip.routeId = routes[0].id;        
        
        
        dataCopy[selectedSchedule].trips
            .push(emptyTrip)

        return dataCopy;
    })
}

    //data loading
    if (!data || !routes) return <main>loading...</main>;
    
    //data loaded, but this line doesn't have any routes yet
    if (routes.length == 0) return <div className="mt-3">
    This line has no routes yet. Go create a new route with some bus stations first. 
    <Link to={`/admin-panel/lines/${lineId}`}
            className="btn btn-primary mx-2"
        >Add routes</Link>
    </div>

    //all good 
    return(
        <main className="row align-items-start pt-3 pb-3" onClick={logDataFunk}>
              {
                showValidationFailedMsg &&
                    <div className="alert alert-danger " role="alert">
                    Input validation failed, check if everything's entered right
                    </div>
               }

            
            <div className="d-flex flex-wrap gap-4 mb-5">
                <SchedulePickTable data={data} className="  " 
                    handleNewSchedule={handleNewSchedule} routes={routes} handleClickOpen={handleClickOpen} 
                    selectedSchedule={selectedSchedule} />                

                <div className="d-flex flex-wrap flex-grow-1 justify-content-end gap-3 align-content-start">
                    <Link to={`/admin-panel/lines/${lineId}`} className="btn btn-secondary">Go to Lines</Link>

                    <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                </div>
            </div>
            
            
            



<div className="d-flex justify-content-evenly align-content-start  flex-wrap">
            {data.length != 0 &&
                <Timetable routes={routes} schedule={data[selectedSchedule]} handleRouteChange={handleRouteChange}
                    selectedSchedule={selectedSchedule} handleReverseStops={handleReverseStops} handleChange={handleChange}
                    staticData={staticData} handleDeleteTrip={handleDeleteTrip}
                    className="col-md-8" />
            }


            {data.length != 0 &&
                <div className="">
                    <div className="">
                    <button className="btn btn-secondary" onClick={handleAddTrip}>
                    <FontAwesomeIcon icon={faPlus} /> Add trip</button>
                    </div>
                    <Constraints schedule={data[selectedSchedule]} handleChange={handleChange} />
                </div>
            }
            </div>
            
        </main>
    )
}