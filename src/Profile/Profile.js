import "./Profile.css";
import { signOutWithGoogle } from "../Firebase.js";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  function handleLogOut () {
    //once the user is done interacting with the site, they can go ahead and sign out and then get redirected back to the login page 
    signOutWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="center">
        <div className="Profile px-4 py-3">
          <h1 className="text-2xl font-semibold">Player Profile</h1>
          <p className="py-2">
            <strong>Name: </strong>
            {localStorage.getItem("name")}
          </p>
          <p>
            <strong>Email: </strong>
            {localStorage.getItem("email")}
          </p>
          <h1 className="py-4">
            <button  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleLogOut}>Sign Out with Google</button>
          </h1>
          
        </div>
      </div>
    </>
  );
}
