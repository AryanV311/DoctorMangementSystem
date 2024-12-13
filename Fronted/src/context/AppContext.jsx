/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

const AppcontextProvider = (props) => {
  const [doctors, setDoctors] = useState([])

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  // console.log(backendUrl);

  const getDoctorsData = async() => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list")
      console.log(data);
      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    doctors,
    currencySymbol,
    backendUrl,token,setToken
  };

  useEffect(() => {
    getDoctorsData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppcontextProvider;
