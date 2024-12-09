
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {assets} from "../assets/assets"

export const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)

    const logout = () => {
        aToken && setAToken("")
        aToken && localStorage.removeItem('aToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white border-b'>
        <div className='flex items-center gap-2 text-xs'>
            <img src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 border-gray-500 text-gray-600 rounded-full'>{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-primary px-10 py-2 text-sm text-white rounded-full'>Log out</button>
    </div>
  )
}
