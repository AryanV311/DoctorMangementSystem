import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

const AppcontextProvider = (props) => {
  const [doctors, setDoctors] = useState([])

  const [token, setToken] = useState("")

  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

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
  },[])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppcontextProvider;
