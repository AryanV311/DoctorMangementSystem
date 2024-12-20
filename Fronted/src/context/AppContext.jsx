/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

const AppcontextProvider = (props) => {

  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData, setUserData] = useState(false)
 


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

  const loadUserProfileData = async() => {
   
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user data.");
    } 
  }

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    
  };

  useEffect(() => {
    getDoctorsData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppcontextProvider;
