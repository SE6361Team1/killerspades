import { signInWithGoogle } from "./Firebase.js";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  function handleLogin () {
    navigate("/Profile");
  }
  
  return (
    <div className="Home">
      <h1>Welcome to Killer Spades</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      {handleLogin()}
    </div>
  );
}
