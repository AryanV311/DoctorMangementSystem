import { useState } from "react";

export const Login = () => {
  const [state, setState] = useState("Sign up");

  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmithandler = (e) => {
    e.preventDefault();
  }
  return <>
      <form className="min-h-[80vh] flex items-center" onSubmit={onSubmithandler}>
        <div className="flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">{state === "Sign up" ? "Create Account": "Login" }</p>
          <p>Please {state === "Sign up" ? "Sign up": "log in"} to book appointment</p>
          {
            state === "Sign up" &&  <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-300 w-full rounded p-2 mt-1" type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          }
          <div className="w-full">
            <p>Email</p>
            <input className="border border-zinc-300 w-full rounded p-2 mt-1" type="email" onChange={(e) => setemail(e.target.value)} value={email} />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input className="border border-zinc-300 w-full rounded p-2 mt-1" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <button className="bg-primary w-full py-2 text-white rounded-md text-base">{state === "Sign up" ? 'Create Account' : 'Login'}</button>
          {
            state === "Sign up"
            ? <p>Already have an account? <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">Login here</span></p>
            : <p>Create an account? <span onClick={()=> setState("Sign up")} className="text-primary underline cursor-pointer">click here </span></p>
          }
        </div>  
      </form>  
  </>
};
