
import { useContext } from 'react';
import './App.css'
import { Login } from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Route, Routes } from "react-router-dom"
import { AddDoctor } from './pages/Admin/AddDoctor';
import { AllAppointment } from './pages/Admin/AllAppointment';
import { Dashboard } from './pages/Admin/Dashboard';
import { DoctorList } from './pages/Admin/DoctorList';

function App() {

  const { aToken} = useContext(AdminContext)
  

  return aToken ? (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
          <Route path="/" element={<></>} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/all-appointment" element={<AllAppointment />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor-list" element={<DoctorList />} />
          </Routes>
              
              
        </div>
      </div>
  ) : (
    <>
    <Login />
    <ToastContainer />
</>
  )
}

export default App
