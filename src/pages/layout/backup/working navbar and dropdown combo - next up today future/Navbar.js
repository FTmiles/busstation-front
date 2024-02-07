import { Link } from "react-router-dom";
import NavUL from "./NavUL.js";
import { useEffect, useState } from "react";

function Navbar() {
  const [dropdownLabel, setdropdownLabel] = useState("Select an option");


  useEffect(() => {
    const activeDropdownItem = document.querySelector('.dropdown-item.active');
    console.log("useEffect inside navbar, checking which class is active, then set button text");
    if (activeDropdownItem) 
    setdropdownLabel(activeDropdownItem.textContent);
    
  }, []);

  
  return (
    <>
      <div className="dropdown d-block d-md-none dropdown-navbar">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {dropdownLabel}
        </button>

        <NavUL aClass="dropdown-item" ulClass="dropdown-menu" clickFunc={setdropdownLabel}/>
      </div>
      


      <nav className="navbar navbar-expand-md ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <NavUL aClass="nav-link" ulClass="navbar-nav" liClass="nav-item" clickFunc={setdropdownLabel} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
