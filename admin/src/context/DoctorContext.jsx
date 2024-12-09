/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";


export const DoctorContext = createContext()

export const DoctorContextProvider = (props) => {


    const value ={

    }


    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
