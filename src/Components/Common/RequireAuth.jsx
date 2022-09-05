import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const userRole = location.state;
    const userLoginData = JSON.parse(sessionStorage.getItem('userData'))

    console.log(userRole);
    console.log(userLoginData);
    let Role = "";
   
    if(userLoginData.role !==undefined) {

        // Role = userRole.role;
        Role =userLoginData.role;
    }
     console.log("Role",Role)
    console.log(allowedRoles?.includes(Role), Role, allowedRoles);

  return (
<>    
    {allowedRoles?.includes(Role)
        ? <Outlet />:
        
         <Navigate to="/" state={{message:"Sorry, it's not allowed to go beyond this point!", status:"404"}} />
    }
</>);
}

export default RequireAuth;