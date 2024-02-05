import { NavLink, useMatch } from "react-router-dom"

export default function SideBar(){
  // Use useMatch hook to check if the current route matches exactly
  const isExactAdminPanel = useMatch('/admin-panel');

    return(

<ul class="nav flex-column">
  <li class="nav-item">
    <NavLink className="nav-link" to="/admin-panel" end>Admin home</NavLink>
  </li>
  <li class="nav-item">
  <NavLink className="nav-link" to="/admin-panel/holidays">Configure holidays</NavLink>
  </li>
  <li class="nav-item">
  <NavLink className="nav-link" to="/admin-panel/yearly-rules">Yearly rules</NavLink>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>

    )
}