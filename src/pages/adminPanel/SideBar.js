import { NavLink, useMatch } from "react-router-dom"

export default function SideBar(){
  // Use useMatch hook to check if the current route matches exactly
  const isExactAdminPanel = useMatch('/admin-panel');

    return(

<ul className="nav flex-column">
  <li className="nav-item">
    <NavLink className="nav-link" to="/admin-panel" end>Admin home</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/admin-panel/holidays">Configure holidays</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/admin-panel/bus-stops">Bus stops</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/admin-panel/lines">Bus lines</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/admin-panel/schedules">Schedules</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/admin-panel/yearly-rules">Yearly rules</NavLink>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>

    )
}