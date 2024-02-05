import { Outlet } from "react-router-dom";
import SideBar from "pages/adminPanel/SideBar";

function AdminPanel(){


    return (
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-2" style={{background:"#bdbdbd"}}>
    <SideBar />
    </div>
    

    <div class="col-sm-10">
        <Outlet />
    </div>
  </div>
</div>


    )


}


export default AdminPanel;