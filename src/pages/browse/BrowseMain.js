import { useEffect, useState } from "react"
import { apiGetLinesPreview } from "services/user.service"
import { Link } from "react-router-dom";
import BrowseTableRow from "./BrowseTableRow";

export default function BrowseMain() {
    const [data, setData] = useState()
    
    useEffect(()=> {
      apiGetLinesPreview().then(response => setData(response.data))
    },[])

    const logState = () =>{
      console.log("data > ", data);
    }

    if (!data) return <main>loading...</main>
    return(
        <main onClick={logState}>
             <table className="table ">
            <thead>
                <tr>
                    <th>Name</th><th>From</th><th>To</th><th className="d-none d-md-table-cell">Via</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, i)=>(

                    <BrowseTableRow row={row} key={row.id} isEvenRow={i%2 === 0} />
                ))}
                
              </tbody>
        </table>
        </main>
    )
}








