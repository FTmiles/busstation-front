

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
                             {activeRoute.distanceMetersList[index]}
                         </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

