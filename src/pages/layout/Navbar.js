import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { dateToString } from 'utils/myUtils'; 

  //https://reactdatepicker.com/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS

import AuthService from 'services/auth.service';

const Navbar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [admin, setAdmin] = useState(undefined);


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user?.roles.includes("ROLE_ADMIN")) 
      setAdmin(user)
  },[])

  const navigate = useNavigate();

 
  function handleDateChange(date){
    //router navigation
        navigate(`/date/${dateToString(date)}`); 

    //set datepicker date
    setSelectedDate(date)
  }

 const handleLogOut = () => {
  AuthService.logout();
  navigate("/");        //navigate("/profile");
  window.location.reload();
 }
  return (

    <div className='d-flex align-items-center pb-1'>
            <NavLink className="btn btn-primary mx-2" onClick={()=>{setSelectedDate(new Date())}} to="/">Today</NavLink>

            

              <div className="d-inline-block ms-2" >
                <DatePicker 
                  name='datePicker-linterNeedsNameOrId'
                  selected={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  withPortal
                  portalId="root-portal"
                />
              </div>
              {admin && <>
                  <NavLink className="btn btn-secondary ms-auto" to="/admin-panel">Admin board</NavLink>
                  <Link onClick={handleLogOut} className="btn btn-secondary mx-2"> Log out</Link>
                </>
              }
</div>
   
  );
};

export default Navbar;