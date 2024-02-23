import { useNavigate } from "react-router-dom";
import { getDocument } from "../Firebase.js";
import { storeAndRetrieveData } from "../Firebase.js";
import { storeFieldIntoDocument } from "../Firebase.js";
import { getAllEntriesFromCollection } from "../Firebase.js";
import { getEntriesMatchingField } from "../Firebase.js";
import { isFieldFilledInDoc } from "../Firebase.js";
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

    function displayGames(){
        console.log(getAllGames(localStorage.getItem("email")))
    }

    async function getAllGames(email){
        const gamesQuery = await getAllEntriesFromCollection("Games");
        const gamesArrayArray = await Promise.all(
            Array.from({ length: 4 }, (_, i) => 
                getEntriesMatchingField(gamesQuery, "player" + (i + 1), email)
            )
        );
        return combineArrays(gamesArrayArray);
    }

    //a method to combine the arrays but only the unique ones
    function combineArrays(gamesCollection){
        //we make a set (a data type that doesnt accept duplicates)
        const gameSet = new Set();
        console.log("I am inside the combineArrays Method")
        console.log(gamesCollection)
        console.log(gamesCollection.length)
        for (let i = 0; i < gamesCollection.length; i++){
            const row = gamesCollection[i];
            console.log("This is the row")
            console.log(row)
            for(let j = 0; j< gamesCollection[i].length; j++){
                gameSet.add(gamesCollection[i][j]);
            }
        }
        console.log("Set of all the games: ")
        console.log(gameSet)
        return gameSet;
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
        
    </form>
    <h1 className="py-7">
            <button  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={displayGames}>Click me to get games!</button>
        </h1> 
        <h1 className="py-6">
            <button  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={goBack}>Go Back</button>
    </h1> 
    </>
    )



}