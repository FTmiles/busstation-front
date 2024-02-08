

export default function BusStopTable({route}){

    return (
        <table>
            <thead>
                <th>Name</th><th>Distance</th>
            </thead>
            <tbody>
                {route.stopsArr.map((stop, index)=>(
                    <tr>
                        <td>stop.name</td>
                        <td>route.distanceMetersArr[index]?.distanceMeters</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}