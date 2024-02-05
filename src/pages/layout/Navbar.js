import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { dateToString } from 'utils/myUtils'; 

  //https://reactdatepicker.com/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS



const Navbar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());


  const navigate = useNavigate();

 
  function handleDateChange(date){
    //router navigation
        navigate(`/date/${dateToString(date)}`); 

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
              <NavLink className="btn btn-secondary" to="/admin-panel">Admin panel</NavLink>
</>
   
  );
};

export default Navbar;