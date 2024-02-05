import { Outlet } from "react-router-dom";
import SideMenu from "pages/adminPanel/SideMenu";

function AdminPanel(){


    return (
        <>
        <SideMenu />
        <Outlet />
        </>
    )


}


export default AdminPanel;