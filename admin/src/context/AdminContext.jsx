/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import axios from "axios";
import { createContext, useState } from "react";
import {toast} from "react-toastify"


export const AdminContext = createContext()

export const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const [doctors, setDoctors] = useState([]);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctor = async() => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", {}, {headers:aToken} );

            if(data.success){
                console.log(data.doctors);
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        aToken,
        setAToken,
        backendUrl,doctors,getAllDoctor
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}