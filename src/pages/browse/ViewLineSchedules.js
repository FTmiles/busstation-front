import { faArrowRightLong, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { apiGetSchedulesByLineBrowse } from "services/user.service";
import { dateRegex, generateDaysOfWeek, validateInteger } from "utils/myUtils";
import BsBubbles from "./BsBubbles";

const findRuleToday = (arr, queryDate) => {
    for (const rule of arr) {
        for (const dateRange of rule.timePeriods) {
            const startDate = new Date(queryDate.getFullYear(), dateRange.startMonth - 1, dateRange.startDay);
        const endDate = new Date(queryDate.getFullYear(), dateRange.endMonth - 1, dateRange.endDay);
        const isWithinRange = startDate <= queryDate && queryDate <= endDate;
        if (isWithinRange) return [rule.periodName]

        }
        
   }
    return [];
}

const makeDateObjFromStrOrEmpty = (dateStr) => {
    return dateRegex.test(dateStr) ? new Date(dateStr) : new Date();
}

const validateDir = (dir) => {
    switch (dir) {
        case 'City bound':
          return dir
          break;
        case 'Circle':
          return dir
          break;
        default:
          return "Out bound"
      }
}

export default function ViewLineSchedules(){
    const [data, setData] = useState();
    const [line, setLine] = useState();
    const {lineId, schedId, tripId} = useParams();
    const [dir, setDir] = useState();
    const [flipped, setFlipped] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(0);
    const [ruleFilter, setRuleFilter] = useState([]); //all checked values appear in the array, multiple selection
    const [allYearlyRules, setAllYearlyRules] = useState();
    
    const [searchParams] = useSearchParams();
    const [queryDate, setQueryDate] = useState(makeDateObjFromStrOrEmpty(searchParams.get('date')))
    const [qdir, setQdir] = useState(validateDir(searchParams.get('dir')));
    const [qbsFrom, setQbsFrom] = useState(validateInteger(searchParams.get('from')))

    const [noScheduleError, setNoScheduleError] = useState();

    // const [query]

    console.log("TIRP ID: ", tripId)

    const logState = () => {
        console.log("data > ", data);
        console.log("line > ", line);  
        console.log("generate curr trip table data > ", generateTableData())  
        console.log("dir > ", dir)
        console.log("all yearly rules", allYearlyRules);
        console.log("rule filters", ruleFilter);
        console.log("selectedSchedule > ", selectedSchedule);
    }





    useEffect(()=>{
        apiGetSchedulesByLineBrowse(lineId).then(response => {
            if (response.data.nothingFound) {
                setNoScheduleError ("This line has no schedules, inform administration")
                return;
            }
            const schedules = response.data.schedules;
            console.log("HERE schedules", schedules)

            if (schedules[0].trips.length === 0) {
                setNoScheduleError("The line is broken, schedule has no trips")
                return;
            }
            let localDir = schedules[0].trips[0].boundFor;

            //if tripId is provided in URL, then set selected schedule and direction accordingly
            if (schedId){
                schedules.findIndex(sched => {
                    if (sched.id === validateInteger(schedId)) {
                        console.log("!!!sched", sched)
                        for (const trip of sched.trips) {
                            if (trip.id === validateInteger(tripId)) {
                                localDir = trip.boundFor;
                                console.log("trippin", trip);
                                if (trip.boundFor === "City bound") setFlipped(true)
                                break;
                            }
                        }
                      return true;
                    }
                })
            }

            setDir(localDir);             
            console.log("schedules",schedules);
            //first sort, later setSelectedSchedule
            schedules.sort((a,b) => {
                console.log("the dir here is ",localDir)
                const a1 = a.trips.find(trip=>trip.boundFor === localDir)?.timeList[0].split(":")
                const b1 = b.trips.find(trip=>trip.boundFor === localDir)?.timeList[0].split(":")
                return (a1[0] * 60 + a1[1]) - (b1[0] * 60 + b1[1])
            })

            if (response.data.line.enabledSeasonalYearlyRuleFilter)
                setRuleFilter(findRuleToday(response.data.yearlyRules, queryDate))
            
            if (schedId) setSelectedSchedule( schedules.findIndex(sched => sched.id === validateInteger(schedId)) )
            setAllYearlyRules(response.data.yearlyRules)
            setData(schedules)
            setLine(response.data.line)
        })            
    }, [])

    const handleFlipDirection = () => {
        setDir(og=> og === "Out bound" ? "City bound" : "Out bound")
        setFlipped(!flipped)
    }

    const generateTableData = () => {
        const trip = data[selectedSchedule].trips.find(trip => trip.boundFor === dir);
        if (trip.routeDirReversed) trip.route.stopsArr.reverse()
        return trip.route.stopsArr.map((stop, index) => ({
                stop: stop, 
                time: trip.timeList[index].slice(0,5),
                highlight: stop.id === validateInteger(qbsFrom) && dir === qdir ? true : false
            }))
    }

    const handleChangeSchedFilter = (e) => {
        const {value, checked} = e.target;
        console.log("value is___" , value)
        console.log("checked is___" , checked)
    
        let filterCopy = [... ruleFilter];
        if (checked) 
            filterCopy.push(value);
        else
            filterCopy = filterCopy.filter(rule => rule !== value)
    
        setRuleFilter(filterCopy)
    }

    
    if (noScheduleError) return <main>{noScheduleError}</main>
    if (!data || !line || !dir || !allYearlyRules) return <main>loading...</main>
    return(
        <main className="container" onClick={logState} >
            <div className="row">
            <div className="mygrid-container">
                
                {/* .mygrid-menu */}
                <div className="mygrid-menu">
                    <h1 className="text-center"> {line.name} </h1>
                    
                    {/* filter for filtering by yearly rule - e.g. winter/summer */}
                    {
                    line.enabledSeasonalYearlyRuleFilter &&
                    <div className="bg-dark text-light p-2 mb-2">
                        {  
                            allYearlyRules.map(rule=>rule.periodName).map((rule, index) => (
                                <div className="form-check form-check-inline" key={rule}>
                                    <label className="form-check-label">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="YearlyRuleFilter"
                                        value={rule} 
                                        checked={ruleFilter.includes(rule)}
                                        onChange={(e) => handleChangeSchedFilter(e)}
                                    />
                                   {rule}
                                 </label>
                              </div>
                            ))
                        }
                    </div>
                    }

                    <ul className="list-group">
                        {
                        data.filter(sched=>{
                            if (!line.enabledSeasonalYearlyRuleFilter) return true;
                            return ruleFilter.includes(sched.runsOnYearlyStr)
                        }).map((schedule, index) => (
                        <li key={schedule.id} className={`list-group-item d-flex gap-4 
                        
                        ${schedule.id === data[selectedSchedule].id ? "list-group-item-primary" : ""}
                        
                        `} onClick={()=> setSelectedSchedule(  data.findIndex(sched => sched.id === schedule.id)  )}>
                            <span className="my-layout-shift-fix" style={{minWidth:"3rem"}}>{schedule.trips.find(trip => trip.boundFor === dir).timeList[0].slice(0,5)}</span>
                            <span>{generateDaysOfWeek(schedule.runsOnWeekly)}</span>
                            <span>{schedule.runsOnYearlyStr === "Apskritus metus" ? "-" : schedule.runsOnYearlyStr}</span>
                        </li>
                        ))                        
                        }  
                    </ul>
                </div>
                
                {/* .mygrid-list */}                
                <div className="mygrid-list">
                    {
                    line.routeType === "City Bus"
                    ?
                    <div className="fs-3 text-center"> {line.routeType} </div>
                    :
                    <div className="d-flex align-items-center">
                        <div style={{ flex: 1 }} className="fs-3 text-center text-md-end pe-md-4">{line.routeStart}</div>
                        <button className={`btn`} disabled={new Set(data[selectedSchedule].trips.map(trip => trip.boundFor)).size < 2}
                             onClick={handleFlipDirection}><FontAwesomeIcon icon={faArrowRightLong} className={`flip-animation ${flipped ? 'flipped' : ''}`} /></button>
                        <div style={{ flex: 1 }} className="fs-3 text-center text-md-start ps-md-4">{line.routeEnd}</div>
                    </div>            
                    }    
                    <div className="px-4 d-flex align-items-center flex-column">
                            <span className="fs-4 my-3 text-secondary">{data[selectedSchedule].trips.find(trip => trip.boundFor === dir).route.routeNotes}</span>
                            
                            <BsBubbles data={generateTableData()} />
                    </div>
                 </div>

                {/* .mygrid-info */}
                <div className="mygrid-info"> 
                    <table className="table table-light" >
                        <thead></thead>
                        <tbody>
                            <tr><td>Runs on public holidays</td><td className="fw-bold">{data[selectedSchedule].runsOnPublicHolidays ? "Yes" : "No"}</td></tr>
                            <tr><td>Operator</td><td>{line.operator}</td></tr>
                            <tr><td>Anyksciai AS platform</td><td>{line.anykStationPlatform}</td></tr>
                            <tr><td>Scope</td><td>{line.routeType}</td></tr>
                            {
                                line.customNotes.map(note => (
                                    <tr key={note.id}>
                                        <td>{note.noteKey}</td>
                                        <td>{note.noteValue}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div></div>
        </main>
    )
}