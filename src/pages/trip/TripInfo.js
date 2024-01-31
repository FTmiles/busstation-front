
export default function TripInfo(props){
    let data = props.data;


    return (
        <div>
            <p>{data.lineName}</p>
            <p>{data.routeStart}</p>
            <p>{data.routeEnd}</p>
            <p>{data.via}</p>
            <p>{data.operator}</p>
            <p>{data.anykStationPlatform}</p>
            <p>{data.price}</p>
            <p>{data.routeType}</p>
            <p>{data.timeConstraintsDescription}</p>
        </div>
    );

}

