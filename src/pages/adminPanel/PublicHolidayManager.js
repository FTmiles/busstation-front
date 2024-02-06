import useFetch from "hooks/useFetch"
import config from "config";
  
//https://reactdatepicker.com/
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css'; // Import CSS
import { useState } from "react";

  
export default function PublicHolidayManager(){
    const [formData, setFormData] = useState({});

    const handleAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        setFormData(values => ({...values, [fieldName]: fieldValue}))
        console.log(formData);
    }

    const handleDatePickerChange = (newDate) => {
        setFormData(values => ({...values, 
            ["month"]:newDate.getMonth(),
            ["day"]:newDate.getDate()}))
        console.log(formData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const newHoliday = {
            name: formData.name,
            month: formData.month,
            day: formData.day
        }
        data = {...data, newHoliday}

    }

    let { data, loading, error } = useFetch(`${config.API_ROOT_PATH}/holidays/all`);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
        <h1>Manage public holidays</h1>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Holiday</th><th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map(holiday=>{
                    return <tr>
                        <td>{holiday.name}</td>
                        <td>{`${holiday.month}-${holiday.day}`}</td>
                    </tr>
                })}
            </tbody>
            </table>
            <h2>Add new:</h2>fff
            <form>
                <label> wef
                <input name="name" placeholder="Enter a name..." onChange={handleAddFormChange} onSubmit={handleAddFormSubmit} />
                </label>
                <DatePicker 
                  
                  selected={Date.now()}
                  onChange={handleDatePickerChange}
                  dateFormat="MM-dd"

                  />

            </form>
 
        </>
    )
}