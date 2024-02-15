import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import TableSearch from "./TableSearch";
//
import { apiGetBusStopsAll, apiPostBusStopSave, apiGetBusStopSearch, apiDelBusStop } from "services/user.service.js"


import { useState, useEffect } from "react";

  
export default function BusStopManager(){
    //need to initialize with "", if not - this error - Warning: A component is changing an uncontrolled input to be controlled.
    const [formData, setFormData] = useState({name:"", coords:"", defaultOption:false });
    const [tableData, setTableData] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editTRowData, setEditTRowData] = useState({})
    let debounceTimeout;

    useEffect(()=>{
        apiGetBusStopsAll()
            .then(response => setTableData(response.data))
            .catch(error=> console.log("error fetching data - Bus stops", error))
    }, [])

    const handleAddFormChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setFormData(values => ({...values, [name]: checked}));
        } else {
            setFormData(values => ({...values, [name]: value}));
        }
    
    }



    const handleEditFormChange = (event) =>{
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setEditTRowData(values => ({...values, [name]: checked}));
        } else {
            setEditTRowData(values => ({...values, [name]: value}));
        }
    }


    const handleAddFormSubmit = async (event) => {
        event.preventDefault();

        apiPostBusStopSave(formData)
        .then(response => {
          console.log('Entry added successfully:', response.data);
          setTableData(oldVals => ([...oldVals, response.data]));
          setFormData(ogObj => {
            const wipedObj = {}
            Object.keys(ogObj).forEach(key => wipedObj[key] = "")
            return wipedObj;
        })
        })
        .catch(error => console.error('Error adding entry:', error.message));

    }
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        setEditTRowData(og => ({...og, id:editRowId}))

        apiPostBusStopSave(editTRowData)
            .then(response => {
                console.log("Entry updated successfully:", response.data);
                setTableData(ogArray => {
                    const index = ogArray.findIndex(x=> x.id === editRowId)
                    const newArray = [...ogArray]
                    newArray[index] = response.data
                    return newArray;
                })})
                .catch(error => console.error('Error updating entry: ', error.message))
            
                setEditRowId(null);
    }

    const handleEditClick = (row)=> {
        setEditRowId(row.id);
        setEditTRowData(row)
    }

    const handleCancelClick = () => setEditRowId(null);
    

    const handleDeleteClick = (row) => {
        setTableData(og=> og.filter(x=> x !== row))
        apiDelBusStop(row.id)

    }

    const handleSearchChange = (query) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {

        apiGetBusStopSearch(query)
                .then(response => {
                    console.log("Entry updated successfully:", response.data);
                    setTableData(
                        response.data
                    )})
                    .catch(error => console.error('Error updating entry: ', error.message))
                
        }, 500); // Debouncer delay
    }

    return (
        <>
            <h1>Manage bus stops</h1>
            
            <TableSearch handleSearchChange={handleSearchChange} />

            <form className="row g-3" onSubmit={handleAddFormSubmit} autoComplete="off" id="newBusStopForm">
                <div className="col-auto">
                    <input name="name" placeholder="Enter new bus stop..." onChange={handleAddFormChange}
                    className="form-control" value={formData.name} />
                </div>
                <div className="col-auto">
                <input name="coords" placeholder="Coordinates..." onChange={handleAddFormChange}
                    className="form-control" value={formData.coords} />
                </div>
                <div className="col-auto">
                <div className="form-check form-switch">
                    <label> Default in search
                        <input type="checkbox" name="defaultOption"  onChange={handleAddFormChange}
                        className="form-check-input" checked={formData.defaultOption} />
                    </label>
                </div>
                </div>
                <div className="col-auto">
                    <input type='submit' className="btn btn-primary" />
                </div>
            </form>
  
        <form onSubmit={handleEditFormSubmit} autoComplete="off" id="tableEditForm">
        <table className='table table-striped '>
            <thead>
                <tr>
                    <th>Bus Stop Name</th>
                    <th style={{width:"150px"}}>Coords</th>
                    <th>Default in search</th>
                    <th style={{width:"140px"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map(row=>(

                editRowId === row.id ? 
                    <EditableRow editTRowData={editTRowData} handleEditFormChange={handleEditFormChange} key={row.id}
                     handleCancelClick={handleCancelClick} /> : 
                    <ReadOnlyRow row={row} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} key={row.id} />

                 ))}
            </tbody>
            </table>
            </form>


            

        </>
    )
}