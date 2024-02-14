import { signInWithGoogle } from "../Firebase.js";
import { useNavigate, Navigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  function handleLogin () {
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
      <h1>Welcome to Killer Spades!</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
