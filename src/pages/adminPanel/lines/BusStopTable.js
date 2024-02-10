

export default function BusStopTable({activeRoute}){

    console.log("from inners", activeRoute);
    return (
        <table className="table d-inline-block ms-4 caption-top" style={{width:"auto"}}>
          <caption>{activeRoute.routeNotes || "main"}</caption>
            <thead>
                <tr>
                <th>Name</th><th>Distance</th>
                </tr>
            </thead>
            <tbody>
                {activeRoute?.stopsArr.map((stop, index)=>(
                    <tr key={index}>
                        <td>{stop?.name}</td>
                        <td className="vertical-center">
                             {activeRoute.distanceMetersArr[index]?.distanceMeters}
                         </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

