import "./GameRoom.css"
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export const GameRoom = () => {
    const {roomId} = useParams();
    const socketRef = useRef(null);
    const inputRef = useRef(null);
    const bidInputRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [allPlayersReady, setAllPlayersReady] = useState(false); 
    const [dealer, setDealer] = useState(null);
    var username = "";
    const [myCards, setMyCards] = useState([]);
    const [myUsername, setMyUsername] = useState([]);
    var allCards = {};
    const [bids, setBids] = useState([]);
    const [myTurnToBid, setMyTurnToBid] = useState(false);

    // Messaging in chat
    useEffect(() => {
        //socketRef.current = io('http://localhost:3001');
        const windowIP = window.location.origin;
        const windowMinusPort = windowIP.slice(0,-4);
        const windowAndNewPort = windowMinusPort + "3001"
        socketRef.current = io(windowAndNewPort);
        console.log("Socket" + socketRef)
        console.log("Socket (again) " + windowAndNewPort)

        if (roomId) {
            socketRef.current.emit('joinRoom', roomId);
        }

        // listen for messages, display in list
        socketRef.current.on("message", (data) => {
            console.log( data);
            const li = document.createElement('li');
            li.innerText = data;
            document.querySelector('ul').appendChild(li);
        });
        
        //listen for the all player ready server side message
        socketRef.current.on("allPlayersReady", () =>{
            alert("All Players are Ready!");
            setAllPlayersReady(true);
        })

        //listen for the username and then print it to the console and set the variable
        socketRef.current.on("username", (messageData) => {
            console.log(messageData)
            username = messageData;
        })

        socketRef.current.on('bidUpdate', (updatedBids) => {
            setBids(updatedBids);
        });

        socketRef.current.on('bidTurn', () => {
            console.log("my turn to bid");
            setMyTurnToBid(true);
        });

        return () => {
            socketRef.current.emit('leaveRoom', roomId);
            socketRef.current.off("allPlayersReady");
            socketRef.current.disconnect();
        };
    }, [roomId]);

    //show the dealed cards on the console with each username associated with it 
    useEffect(() =>{
        // Display cards for each player in console log
        socketRef.current.on("cardData", (playersWithCards) => {
            console.log("Cards with each player: ")
            allCards = playersWithCards;
            playersWithCards.forEach(player => {
                console.log(player);
                if (player.username == username){
                    setMyUsername(username)
                    setMyCards(player.cards);
                    //console.log("myCards");
                    //console.log(myCards);
                }
            });
            
        });
        
        //Clean up cardData and dealerChosen listener
        return () => {
            socketRef.current.off("cardData");
            socketRef.current.off("dealerChosen");
        };
    }, [])

    // Dealer
    useEffect(() => {
        // Display dealer in console log
        socketRef.current.on("dealerChosen", (selectedDealer) => {
            console.log("Dealer: ")
            console.log(selectedDealer);
            setDealer(selectedDealer);
        
        });

        // Clean up listener
        return () => {
            socketRef.current.off("dealerChosen");
        };
    },[]);

    // Send message to all in room
    const sendMessage = (e) => {
        e.preventDefault();
        if (inputRef.current && inputRef.current.value) {
            socketRef.current.emit('chatMessage', { text: inputRef.current.value, room: roomId });
            inputRef.current.value = "";
        }
    };

    // Client/user side button press
    const buttonClicked = () =>{
        // Indicate to server that another player is ready in the room
        socketRef.current.emit("playerReady", roomId)
        // Player can no longer click the button again
        setIsButtonDisabled(true)
    }

    // Display current user's card on page
    const displayCards = (arrayOfCards) =>{
        //return makeTable(arrayOfCards); 
        let output = "";
        for (let i = 0; i < arrayOfCards.length; i++){
            output += arrayOfCards[i] + ", "
        }
        return output;
    }

    const submitBid = (bid) => {
        socketRef.current.emit('submitBid', { bid, roomId });
        
      };
    
    const bidSubmissionUI = myTurnToBid ? (
            <div className="py-3">
          <input type="number" ref={bidInputRef} placeholder="Your bid" />
          <button className= "px-3 py-2 text-sm bg-blue-500 text-white rounded" onClick={() => submitBid(bidInputRef.current.value)}>Submit Bid</button>
        </div>
      ): null;

    const bidDisplay = bids.map((bid, index) => (
        <div key={index}>{bid.username}: {bid.bid}</div>
      ));

    return (
        <div>
        <div className="px-2 py-2"> Welcome to Game Room {roomId} </div>
        {allPlayersReady ? (
            <div className="px-2 py -2">
            <div>
                    My username is: {myUsername}
                  <div>
                    Current dealer is: {dealer}
                  </div>
            <div>
                    <form onSubmit={sendMessage}>
                        <input ref={inputRef} type="text" placeholder="Your message"></input>
                        <button className= "px-3 py-2 text-sm bg-blue-500 text-white rounded" type="submit">Send</button>
                    </form>
                    <ul></ul>
                <div>
                   <strong>My Hand</strong> 
                </div>
                <div>
                    {displayCards(myCards)}
                </div>
                {bidSubmissionUI}
                <div >Bids:</div>
                {bidDisplay}
            </div>
            </div>
            </div>
            ) : (
                <div>
                    <div>
                        <div className="px-2 py-2 ">
                            <button onClick={buttonClicked} disabled={isButtonDisabled} className={`px-3 py-2 text-medium bg-blue-500 text-white rounded ${isButtonDisabled ? 'bg-slate-400	cursor-not-allowed' : ''}`}>Player Ready?</button>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={sendMessage}>
                            <input ref={inputRef} type="text" placeholder="Your message"></input>
                            <button className= "px-3 py-2 text-sm bg-blue-500 text-white rounded" type="submit">Send</button>
                        </form>
                        <ul></ul>
                    </div>
                </div>
            )}
        </div>
    );
};
