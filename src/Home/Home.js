import { signInWithGoogle } from "../Firebase.js";
import { useNavigate } from "react-router-dom";

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
  
  return (
    <div className="Home">
      <h1  className="text-3xl font-bold px-3 py-4" >Welcome to Killer Spades!</h1>
      <h1 className="px-3 py-2 space-x-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignUp}>Register</button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleSignUp}>Sign In with Google</button>
      </h1>
    </div>
  );
}
