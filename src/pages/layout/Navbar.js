import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

  //https://reactdatepicker.com/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS



const Navbar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());


  const navigate = useNavigate();

  const goToBus = () => {
    navigate(`/future/${2}`); 
  }

  function handleDateChange(date){
    //router navigation
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with '0' if needed
    const day = String(date.getDate()).padStart(2, '0'); // Pad with '0' if needed
    navigate(`/date/${year}-${month}-${day}`); 

    //set datepicker date
    setSelectedDate(date)
  }



  return (
    <>
            <NavLink className="btn btn-primary" onClick={()=>{setSelectedDate(new Date())}} to="/">Today</NavLink>

            

              <div className="bg-primary d-inline-block ms-3" >
                <DatePicker 
                  
                  selected={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  withPortal
                  portalId="root-portal"
                />
              </div>
</>
   
  );
};

export default Navbar;