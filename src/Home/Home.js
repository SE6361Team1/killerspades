import { signInWithGoogle, logInWithGoogle, signUpWithEmail, loginWithEmail } from "../Firebase.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import backgroundI from '../Assets/bgImage.png';

export function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const predefinedPassword = "pred_pass"

  function handleEmailSignUp(){
    signUpWithEmail(email, predefinedPassword)
      .then(() => {
        alert("You have successfully been registered");
        document.getElementById('registerEmail').value='';
        console.log("Success!")
      })
      .catch(error =>{
        console.error(error);
      })
  }

  function handleEmailLogin(){
    loginWithEmail(loginEmail, predefinedPassword)
      .then(() => {
        navigate("/Profile");
      })
      .catch(error =>{
        console.error(error);
      })
  }

  function handleGoogleSignUp () {
    // This is a promise -- User signs in with Google, and if they are authenticated,
    // it then navigates to Profile
    signInWithGoogle()
      .then(() => {
        navigate("/Profile");
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleGoogleLogIn(){
    // user already has an established account 
    logInWithGoogle()
      .then(() => {
        navigate("/Profile");
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
    <div className="grid grid-rows-2">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 row-span-3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2  className="text-3xl font-bold h-10 w-auto mx-auto text-center" >Welcome to Killer Spades!</h2>
          <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">Register your account</h2>
        </div>
        <div className="mt-3 p-4 sm:mx-auto sm:w-full sm:max-w-sm border-solid border-2 border-slate-600 rounded-lg">
          <div className="space-y-6">
            <div>
              <div className="mt-2">
                <input type="email" id="registerEmail" className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleEmailSignUp} >Register</button>
            </div>
            <div>
              <button className="flex w-full justify-center rounded-md bg-transparent border border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-700 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleGoogleSignUp}>
                <span>Register with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">Sign into your account</h2>
        </div>
        <div className="mt-3 p-4 sm:mx-auto sm:w-full sm:max-w-sm border-solid border-2 border-slate-600 rounded-lg">
          <div className="space-y-6">
            <div>
              <div className="mt-2">
                <input type="email" id="registerEmail" className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleEmailLogin} >Login</button>
            </div>
            <div>
              <button className="flex w-full justify-center rounded-md bg-transparent border border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-700 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleGoogleLogIn}>
                <span>Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* return (
  <div className="bg-backgroundI w-screen h-screen bg-center bg-cover">
    <div className="flex flex-col items-center justify-center h-screen">
      <h1  className="font-bold px-3 py-4 font-mono text-[128px]">KILLER SPADES</h1>
      <h1 className="space-x-[710px]">
        <button className="bg-slate-300 hover:bg-slate-400 text-black font-bold font-mono text-[28px] py-2 px-4 rounded-lg" onClick={handleSignUp}>REGISTER</button>
        <button className="bg-slate-300 hover:bg-slate-400 text-black font-bold font-mono text-[28px] py-2 px-4 rounded-lg" onClick={handleLogIn}>LOGIN</button>
      </h1>
    </div>
    
  </div>
); */



/* return (
  <div className="">
    <h1  className="text-3xl font-bold px-3 py-4" >Welcome to Killer Spades!</h1>
    <h1 className="px-3 py-2 space-x-3">
      <div class="grid gap-4 mb-6 md:grid-cols-2">
        <div>
          <input type="text" id="emailAdd" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-60" onClick={handleEmailSignUp}>Register with Email</button>
        <div>
          <input type="email" id="emailLog" placeholder="Email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-60" onClick={handleEmailLogin}>Login with Email</button>
      </div>
    
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleSignUp}>REGISTER WITH GOOGLE</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleGoogleLogIn}>LOGIN WITH GOOGLE</button>
    </h1>
  </div>
); */