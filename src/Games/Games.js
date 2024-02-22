import { useNavigate } from "react-router-dom";
import { getDocument } from "../Firebase.js";
import { storeAndRetrieveData } from "../Firebase.js";
import { storeFieldIntoDocument } from "../Firebase.js";
export function GamesList() {
    const navigate = useNavigate();
    function goBack () {
        //sends them back to the profile screen
        navigate("/Profile");
    }

    function registerGame() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const player1Email = document.getElementById('player1Email').value;
        const player2Email = document.getElementById('player2Email').value;
        const player3Email = document.getElementById('player3Email').value;
        const gameName = document.getElementById('gameName').value;

        if(date && time && player1Email && player2Email && player3Email) {
            const playerEmails = [player1Email, player2Email, player3Email];

            console.log("Game registered!");
        } else {
            alert("Please fill all fields before registering.");
        }
    }

    function storeGameIntoDB(date, time, playerEmails){
        //storeFieldIntoDocument("Games", )
    }

    return (
    <>
    <p>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <strong>Game Registration</strong>
    </p>
  

    <div id="games"></div>

    

    <form id="gameForm">
        <input type="date" id="date" placeholder="Date Inputted from Calendar" /><br />
        <input type="time" id="time" placeholder="Desired Time" /><br />
        <input type="email" id="player1Email" placeholder ="Player 1 Email" /><br />
        <input type='email' id='player2Email' placeholder ='Player 2 Email' /><br />
        <input type='email' id='player3Email' placeholder ='Player 3 Email' /><br /> 
        <input type='text' id='gameName' placeholder ='Game Name' /><br /> 
        <h1 className="py-5">
            <button  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={registerGame}>Register Game</button>
        </h1> 
        <h1 className="py-6">
            <button  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={goBack}>Go Back</button>
        </h1> 
    </form>
    
    </>
    )



}