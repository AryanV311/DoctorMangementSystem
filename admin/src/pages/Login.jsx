import { useContext, useState } from "react"
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";



export const Login = () => {

  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl} = useContext(AdminContext)
 
  


  const onSubmitHandler = async(e) => {
    e.preventDefault()
      try {
       if(state === 'Admin'){
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {email, password})
        if(data.success){
          console.log(data.token);
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
       }
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 boder rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="font-semibold text-2xl m-auto"> <span className="text-primary">{state}</span> Login</p>
        <div className="w-full">
          <p>Email:</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full mt-1 p-2" type="email" />
        </div>
        <div className="w-full">
          <p>Password:</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full mt-1 p-2"  type="password" />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">Submit</button>
        {
          state === 'Admin'
          ? <p>Doctor Login? <span className="text-primary underline cursor-pointer" onClick={() =>setState('Doctor')}>click Here</span></p>
          : <p>Admin Login? <span className="text-primary underline cursor-pointer" onClick={() => setState('Admin')}>click Here</span></p>
        }
      </div>
    </form>
  )
}
