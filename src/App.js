import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {Profile} from './Profile/Profile.js';
import {Home} from './Home/Home.js';
import {signInWithGoogle, signOutWithGoogle} from "./Firebase.js";

function App() {
  return (
    <>
    {
      <Router>
        <Routes>
            <Route exact path = "/"
              element = {<Home />}
            >/</Route>
            <Route exact path = "/Profile"
              element = {<Profile />}
            >/</Route>
        </Routes>
      </Router>
    }
    </>
  );
}

export default App;
