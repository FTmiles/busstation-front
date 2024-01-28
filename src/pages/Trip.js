import { useState, useEffect, withRouter   } from "react";
import SingleTrip from "../trip/SingleTrip";
import { useParams } from 'react-router-dom';




function Trip({match}) {
  const [tripData, setTripData] = useState(null);

  const { tripId } = useParams();
    
//   const { tripId } = match.params;
console.log(tripId);

  useEffect(() => {
    fetch(`http://localhost:8080/scheduleItem/singleTrip/${tripId}`)
      .then((response) => response.json())
      .then((json) => {
        setTripData(json);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!tripData) {
    return <div>Loading...</div>;

  }

  return (
  <SingleTrip data={tripData} />
    )
}

export default Trip;
