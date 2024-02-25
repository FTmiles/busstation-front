

export default function BusStopTable({activeRoute, secondRowColor}){

    console.log("from inners", activeRoute);
    if (!activeRoute) return "The line has no routes yet";
    return (
        <table className="table d-inline-block ms-4 caption-top my-no-color-background" style={{width:"auto"}}>
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

