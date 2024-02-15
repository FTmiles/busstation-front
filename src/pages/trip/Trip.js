import { useState, useEffect, withRouter } from "react";
import { useParams } from "react-router-dom";
import SingleTrip from "./SingleTrip";
import TripInfo from "./TripInfo";
import { getTripInfo } from "services/user.service.js"

function Trip() {
  const { tripId } = useParams();
  const [errorMsg, setErrorMsg] = useState();
  const [data, setData] = useState();
  
  useEffect(() => {
    getTripInfo(tripId).then(
      response => setData(response.data), 
      error => setErrorMsg(error?.response?.data?.message || error.message || error.toString())
    )
  }, [])

  if (errorMsg) return <p className="alert alert-danger">{errorMsg}</p>;
  if (!data) return <div>loading ... </div>;

  return (
  <main className="container">

    <div className="row">
      <div className='col-12 col-md-6'>
        <SingleTrip stops={data.stops} lineName={data.lineName} /> 
      </div>
      <div className='col-12 col-md-6'>
        <TripInfo data={data} /> 
      </div>
    </div>
  </main>  
  );
}

export default Trip;
