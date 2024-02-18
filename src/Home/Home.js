import { signInWithGoogle, logInWithGoogle } from "../Firebase.js";
import { useNavigate } from "react-router-dom";
//import backgroundI from '../Assets/bgImage.png';

export function Home() {
  const navigate = useNavigate();

  function handleSignUp () {
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

  function handleLogIn(){
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
    <div className="bg-backgroundI w-screen h-screen bg-center bg-cover">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1  className="font-bold px-3 py-4 font-mono text-[128px]">KILLER SPADES</h1>
        <h1 className="space-x-[710px]">
          <button className="bg-slate-300 hover:bg-slate-400 text-black font-bold font-mono text-[28px] py-2 px-4 rounded-lg" onClick={handleSignUp}>REGISTER</button>
          <button className="bg-slate-300 hover:bg-slate-400 text-black font-bold font-mono text-[28px] py-2 px-4 rounded-lg" onClick={handleLogIn}>LOGIN</button>
        </h1>
      </div>
      
    </div>
  );
}
