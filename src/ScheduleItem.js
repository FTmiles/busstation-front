function ScheduleItem(props) {


    return (
    <div className={`schedule-item rounded-3 p-1 mx-1 d-inline-block ${props.data.tooLate ? 'tooLate' : ''}`}>
           <span>{props.data.timeDepart}</span>      <span>{props.data.lineName}</span>   <span>{props.data.destination}</span>
  
  </div>
  );
}

export default ScheduleItem;
