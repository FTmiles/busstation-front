import TimeInput from "./TimeInput";

export default function Timetable({schedule, selectedSchedule, className, routes, handleRouteChange, handleReverseStops, handleChange, staticData}){
    
    const timeConvert = (string) => {
        if (!string) return "";

        const [hours, mins] = string.split(":")
        return `${hours}:${mins}`;
    }


    const get1RouteFromArray = (trip) => {
        let theRoute;
        if (!trip.routeId) 
            theRoute = routes[0];
        else
            theRoute = routes.find(route => route.id === trip.routeId);


        // theRoute.stopsArr = theRoute.stopsArr.slice();
        let busStops = [...theRoute.stopsArr]
        trip.routeDirReversed && busStops.reverse();
        let myArr = busStops.map((stop, index)=>  ({stop:stop.name, time:timeConvert(trip.timeList[index])}))

        return myArr;
    }

    // if (!routes || !schedule) return <div>loading</div>;
    return (
        <div  className={className}>
        { //this trip.id is GOOD unique
            schedule.trips.map((trip, index)=> (
                <table className="caption-top" key={trip.id}>
{/* -----------CAPTION-------------------------------------- */}
                    <caption>  
                        <div className="d-flex justify-content-between">
                            <select className="form-select" aria-label="Default select example" key={index}
                                onChange={e => handleChange(e.target.value, ["trips", index, ], "boundFor")}
                                value={trip.boundFor}>
                                    {/* {data.info[infoKey] ?? <option value=""></option>} */}
                                {
                                    staticData.boundForOptions.map((boundForEnum, index) => (//this key is unique, GOOD
                                        <option key={index} value={boundForEnum}>{boundForEnum}</option>
                                    ))
                                }
                            </select>


                            <div className="form-check form-switch">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" role="switch"  
                                    onChange={(e)=>handleReverseStops(e.target.checked, index)}/>
                                Reverse</label>
                            </div>
                        </div>
                        <select className="form-select" aria-label="Default select example" key={index}
                        value={trip.routeId}
                        onChange={(e)=> handleRouteChange(Number(e.target.value), index)}>
                                {
                                    routes.map(route => (//this key is unique, GOOD
                                        <option key={route.id} value={route.id}>{route.routeNotes}</option>
                                    ))
                                }
                            </select>
                    </caption>
{/* -----------ENDS CAPTION-------------------------------------- */}
                    <thead>
                        <tr>
                            <th>Name</th><th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
{/* --------- 1 table body ----------------------------- */}
                        {
                            get1RouteFromArray(trip) 
                            // get1RouteFromArray(trip.routeId, trip.routeDirReversed)
                            // routes.find(route => route.id === trip.routeId)
                            .map((row, i) => ( 
                                <tr key={i}>
                                <td>{row.stop} </td>
                                <td> 
                                    {
                                        <TimeInput defaultValue={row.time} 
                                        handleChange={handleChange} path={["trips", index, "timeList"]} inputIndex={i}
                                        ></TimeInput>
                                    }
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            ))
        }
        </div>
    )
}