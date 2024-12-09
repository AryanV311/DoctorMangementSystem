import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

export const Sidebar = () => {
    const { aToken } = useContext(AdminContext)

  return (
    <div>
        {aToken && 
            <ul>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={"/dashboard"}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={"/all-appointment"}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointment</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={"/add-doctor"}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Doctors</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={"/doctor-list"}>
                    <img src={assets.people_icon} alt="" />
                    <p>Doctor List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}
