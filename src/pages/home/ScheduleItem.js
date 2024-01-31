import { useNavigate  } from 'react-router-dom';


function ScheduleItem(props) {

  const navigate = useNavigate();

  const goToBus = () => {
    navigate(`/trip/${props.data.id}`); 
  }


    return (
    <div className={`schedule-item rounded-3 p-1 mx-1 d-inline-block ${props.data.tooLate ? 'tooLate' : ''}`} onClick={goToBus}>
           <span>{props.data.timeDepart}</span>      <span>{props.data.lineName}</span>   <span>{props.data.destination}</span>
  
  </div>
  );
}

export default ScheduleItem;
