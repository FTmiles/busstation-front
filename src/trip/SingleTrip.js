function SingleTrip(props) {


let stops = props.data.stops;



  return (
    <div>
      <h1> {props.data.lineName} - d </h1>
      <table className='table table-striped' style={{width: "auto"}}>
        <thead>

        </thead>
        <tbody>
            
      {stops.map(x=>(
      <tr>
        <td>{x.stopName}</td>
        <td>{x.timePoint}</td>
      </tr>
      ) )}
              </tbody>
        </table>
    </div>

  );
}

export default SingleTrip;
