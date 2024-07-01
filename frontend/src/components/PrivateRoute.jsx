import { useSelector } from "react-redux";
import {Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

let  {adminInfo} = useSelector((state) => state.adminAuth);
  return adminInfo ? <Outlet/> : <Navigate to="/login" replace />
}

export default PrivateRoute