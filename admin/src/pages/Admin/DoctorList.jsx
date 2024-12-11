import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"


export const DoctorList = () => {

  const {doctors, getAllDoctor, aToken, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if(aToken){
      getAllDoctor()
    }
  },[aToken])

  return (
    <div className="m-5 min-h-[90vh] overflow-y-scroll ">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap pt-5 gap-4 gap-y-6 border border-b">
        {
          doctors.map((item, index) => (
              <div className="border border-indigo-500 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
                <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
                <div className="p-4">
                  <p className="text-neutral-800 text-lg font-medium">{item.speciality}</p>
                  <p className="text-zinc-600 text-sm">{item.name}</p>
                  <div className="flex mt-2 items-center gap-1 text-sm">
                    <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                    <p>Available</p>
                  </div>
                </div>
              </div>
          ))
        }
      </div>
    </div>
  )
}
