
import Login from "./Pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import PrivateRoute from "./components/PrivateRoute"
import { NavbarDefault } from "./components/Navbar"
import Home from "./Pages/Home"
import AddUser from "./Pages/AddUser"
import EditUser from "./Pages/EditUser"

function App() {

  return (
    <Router>
      <Toaster position="top-right" />
      <NavbarDefault />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/" element={<Home/>} />
            <Route path="/add-user" element={<AddUser/>}/>
            <Route path="/edit-user" element={<EditUser/>}/>
          </Route>
        </Routes>
      

    </Router>
  )
}

export default App
