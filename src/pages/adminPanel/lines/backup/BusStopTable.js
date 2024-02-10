

export default function BusStopTable({activeRoute}){
    console.log(activeRoute);
    return (
        <table className="table" style={{width:"auto"}}>
            <thead>
                <th>Name</th><th>Distance</th>
            </thead>
            <tbody>
                {activeRoute?.stopsArr.map((stop, index)=>(
                    <tr key={stop?.index}>
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

