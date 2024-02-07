import useFetch from "hooks/useFetch"
import config from "config";
import axios from "axios";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


//

//https://reactdatepicker.com/
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css'; // Import CSS
  import { useState, useEffect } from "react";

  
export default function PublicHolidayManager(){
    const [formData, setFormData] = useState({ name: '', calendarDate: "" });
    const [tableData, setTableData] = useState([]);
    const [editHolidayId, setEditHolidayId] = useState(null);
    const [editTRowData, setEditTRowData] = useState({name: '', calendarDate: ""})

    useEffect(()=>{
        axios.get(`${config.API_ROOT_PATH}/holidays/all`)
            .then(response => setTableData(response.data))
            .catch(error=> console.log("error fetching data - publicHolidays", error))
    }, [])

    const handleAddFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(values => ({...values, [name]: value}))
        console.log(formData);
    }

    const handleDatePickerChange = (newDate) => {

        setFormData(values => ({...values, 
            ["month"]:newDate.getMonth() + 1,
            ["day"]:newDate.getDate(),
            ["calendarDate"]: newDate
        }))

        console.log(formData);
    }

    const handleEditFormChange = (event) =>{
        const {name, value} = event.target;
        console.log(event)
        setEditTRowData({...editTRowData, [name]:value})
    }
    const handleEditDatePickerChange = (newDate) => {
        setEditTRowData( values =>({...values,
            ["month"]:newDate.getMonth() + 1,
            ["day"]:newDate.getDate(),
            ["calendarDate"]: newDate
        }))
    }


    const handleAddFormSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);        
        const newHoliday = {
            name: formData.name,
            month: formData.month,
            day: formData.day,
//            id: Math.floor(Math.random() * 10000) * -1
        }   

        axios.post(`${config.API_ROOT_PATH}/holidays/save1`, newHoliday)
        .then(response => {
          console.log('Entry added successfully:', response.data);
          setTableData(oldVals => ([...oldVals, response.data]));
          setFormData({ name: '', calendarDate: '' });
        })
        .catch(error => console.error('Error adding entry:', error.message));
        // setTableData(oldVals => ([...oldVals, newHoliday]))
        // setFormData({ name: '', calendarDate: "" })
    }
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        console.log(editTRowData);
        const editedHoliday = {
            name: editTRowData.name,
            month: editTRowData.month,
            day: editTRowData.day,
            id: editHolidayId
        }

        axios.post(`${config.API_ROOT_PATH}/holidays/save1`, editedHoliday)
            .then(response => {
                console.log("Entry updated successfully:", response.data);
                setTableData(ogArray => {
                    const index = ogArray.findIndex(x=> x.id === editHolidayId)
                    const newArray = [...ogArray]
                    newArray[index] = response.data
                    return newArray;
                })})
                .catch(error => console.error('Error updating entry: ', error.message))
            
                setEditHolidayId(null);
    }

    const handleEditClick = (event, holiday)=> {
        event.preventDefault();
        console.log(holiday);
        setEditHolidayId(holiday.id);

        const rowValues = {
            name: holiday.name,
            calendarDate: new Date(new Date().getFullYear(), holiday.month - 1, holiday.day   ),
            month: holiday.month,
            day: holiday.day

        }
        setEditTRowData(rowValues)
    }

    const handleCancelClick = () => {
        setEditHolidayId(null);
    }

    const handleDeleteClick = (delHoliday) => {
        setTableData(og=> og.filter(x=> x !== delHoliday))
        axios.delete(`${config.API_ROOT_PATH}/holidays/del1?id=${delHoliday.id}`)
    }

    return (
        <>
            <h1>Manage public holidays</h1>
            <form className="row g-3" onSubmit={handleAddFormSubmit} autoComplete="off">
                <div className="col-auto">
                    <input name="name" placeholder="Enter new holiday..." onChange={handleAddFormChange}
                    className="form-control" value={formData.name} />
                </div>
                <div className="col-auto">
                    <DatePicker 
                    showIcon
                    selected={formData.calendarDate}
                    onChange={(date) => handleDatePickerChange(date)}
                    dateFormat="MMM-dd"
                    icon={<FontAwesomeIcon icon={faCalendar} />}
                    dateFormatCalendar="MMMM"
                    placeholderText="Select Date"
                    className="form-control"
                     />
                </div>
                <div className="col-auto">
                    <input type='submit' className="btn btn-primary" />
                </div>
            </form>
  
        <form onSubmit={handleEditFormSubmit} autoComplete="off">
        <table className='table table-striped '>
            <thead>
                <tr>
                    <th>Holiday</th><th style={{width:"150px"}}>Date</th><th style={{width:"140px"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map(holiday=>(

                editHolidayId === holiday.id ? 
                    <EditableRow editTRowData={editTRowData} handleEditFormChange={handleEditFormChange} key={holiday.id}
                    handleEditDatePickerChange={handleEditDatePickerChange} handleCancelClick={handleCancelClick} /> : 
                    <ReadOnlyRow holiday={holiday} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} key={holiday.id} />

                 ))}
            </tbody>
            </table>
            </form>


            

        </>
    )
}