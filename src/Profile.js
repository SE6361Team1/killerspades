import "./Profile.css";
import { signOutWithGoogle } from "./Firebase.js";

export function Profile() {
  return (
    <>
      <div className="center">
        <div className="Profile">
          <h1>Player Profile</h1>
          <p>
            <strong>Name: </strong>
            {localStorage.getItem("name")}
          </p>
          <p>
            <strong>Email: </strong>
            {localStorage.getItem("email")}
          </p>
          <button onClick={signOutWithGoogle}>Sign Out with Google</button>
        </div>
      </div>
    </>
  );
}
