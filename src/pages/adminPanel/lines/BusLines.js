import { useEffect, useState } from "react"
import LineTableRow from "./LineTableRow"
import { apiGetLinesPreview } from "services/user.service.js"


export default function BusLine(){
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        apiGetLinesPreview()
        .then(response => setTableData(response.data))
        .catch(error => console.log("Error fetching data @BusLine.js ", error))
    }, [])



    return (
        <table className="table ">
            <thead>
                <tr>
                    <th>Name</th><th>From</th><th>To</th><th className="d-none d-md-table-cell">Via</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, i)=>(
                    <LineTableRow row={row} key={row.id} isEvenRow={i%2 === 0} />
                ))}
            </tbody>
        </table>
    )
}