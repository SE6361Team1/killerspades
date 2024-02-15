import './Styles/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Profile} from './Profile/Profile.js';
import {Home} from './Home/Home.js';
//import {signInWithGoogle, signOutWithGoogle} from "./Firebase.js";
import './Styles/index.css';

function App() {
  return (
    <>
    {
      <Router>
        <Routes>
            <Route exact path = "/" element = {<Home />}>/</Route>
            <Route exact path = "/Profile" element = {<Profile />}>/</Route>
        </Routes>
      </Router>
    }
    </>
  );
}

export default App;
