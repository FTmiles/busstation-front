import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiGetSchedules } from "services/user.service";
import { faArrowLeft, faRotateLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SchedulePickTable from "./components/SchedulePickTable";



export default function SchMain(){
    const {lineId} = useParams();
    const [data, setData] = useState();
    
     useEffect(() => {
        apiGetSchedules(lineId).then(response => setData(response.data))
    }, [])




    
    if (!data) return <main>loading...</main>;
    return(
        <main>
            <SchedulePickTable data={data} />

        </main>
    )
}