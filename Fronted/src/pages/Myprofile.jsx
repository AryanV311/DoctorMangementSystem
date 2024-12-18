import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

export const Myprofile = () => {

 const { usersData, setUsersData} = useContext(AppContext)
 console.log(usersData);
  
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  return usersData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {
        isEdit ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image):usersData.image} alt="" />
            <img className="absolute w-10 right-12 bottom-12" src={image ? '':assets.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
        : <img className="w-36 rounded" src={usersData.image} alt="" />
      }

      {
        isEdit ? <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" type="text" value={usersData.name} onChange={(e) => setUsersData(prev=> ({...prev, name:e.target.value}))} />
        : <p className="font-medium text-3xl text-neutral-800 mt-4">
          {usersData.name}
        </p>
      }
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{usersData.email}</p>
          <p className="font-medium">Phone:</p>
          {
            isEdit ? <input className="bg-gray-100 max-w-52" type="text" value={usersData.phone} onChange={(e) => setUsersData(prev=> ({...prev, phone:e.target.value}))} />
            : <p className="text-blue-400">
              {usersData.phone}
              </p>
          }
          <p className="font-medium">Address:</p>
          {
            isEdit
             ? <p>
               <input className="bg-gray-50" type="text"  value={usersData.address.line1} onChange={(e) => setUsersData(prev=> ({...prev, line1:e.target.value}))}/>
               <br />
               <input className="bg-gray-50" type="text"  value={usersData.address.line2} onChange={(e) => setUsersData(prev=> ({...prev, line2:e.target.value}))} />
              </p>
              :
              <p className="text-gray-500">{usersData.address.line1}
                <br />
                {usersData.address.line2}
              </p>
             
          }
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {
            isEdit ? <select className="max-w-20" onChange={(e) => setUsersData(prev => ({...prev, gender:e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className="text-gray-400"> {usersData.gender}</p>
          }

          <p className="font-medium">Birthday:</p>
          {
            isEdit ? <input className="max-w-28 bg-gray-100" type="date" onChange={(e) => setUsersData(prev => ({...prev, dob:e.target.value}))} value={usersData.dob}/>
            : <p className="text-gray-400">{usersData.dob}</p>
          }
        </div>
      </div>

      <div className="mt-10">
        {
          isEdit ? 
          <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(false)}>Save Informations</button>
          :
          <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}
