import { signInWithGoogle, logInWithGoogle } from "../Firebase.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import io from "socket.io-client";

//import backgroundI from '../Assets/bgImage.png';

const socket = io('http://localhost:3001');

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('newRoomLink', (roomLink) => {
      console.log('new link:', roomLink);
    });
    return () => {
      socket.off('newRoomLink');
    };
  }, []);

  function generateRoom() {
    socket.emit('Generate Room');
  }

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
    <div className="Home">
      <h1  className="text-3xl font-bold px-3 py-4" >Welcome to Killer Spades!</h1>
      <h1 className="px-3 py-2 space-x-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignUp}>REGISTER</button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleLogIn}>LOGIN</button>
        <button id="linkTest" onClick={generateRoom}>Click me!</button>
      </h1>
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
