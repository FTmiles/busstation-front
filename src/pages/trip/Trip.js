import { useState, useEffect, withRouter } from "react";
import SingleTrip from "./SingleTrip";
import { useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";
import TripInfo from "./TripInfo";

function Trip({ match }) {
  const { tripId } = useParams();

  const { data, loading, error } = useFetch(`http://localhost:8080/scheduleItem/singleTrip/${tripId}`);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
  <main className="container">
    <div className="row">
      <div className='col-12 col-md-6'>
        <SingleTrip data={data} /> 
      </div>
      <div className='col-12 col-md-6'>
        <TripInfo data={data} /> 
      </div>
    </div>
  </main>  
  );
}

export default Trip;
