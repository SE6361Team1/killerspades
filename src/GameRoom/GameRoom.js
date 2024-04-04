import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export const GameRoom = () => {
    const {roomId} = useParams();
    const socketRef = useRef(null);
    const inputRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [allPlayersReady, setAllPlayersReady] = useState(false); 
    const [players, setPlayers] = useState([]); 
    const [playerUsernames, setPlayerUsernames] = useState([])


    
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


        return () => {
            socketRef.current.emit('leaveRoom', roomId);
            socketRef.current.off("allPlayersReady");
            socketRef.current.disconnect();
        };
    }, [roomId]);

    //show the dealed cards on the console with each username associated with it 
    useEffect(() =>{
        socketRef.current.on("cardData", (playersWithCards) => {
            console.log("Cards with each player: ")
            playersWithCards.forEach(player => {
                console.log(player);
            });
        });
        
        //Clean up cardData listener
        return () => {
            socketRef.current.off("cardData");
        };
    }, [])

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


    return (
        <div>
        <div> Welcome to Game Room {roomId} </div>
        {allPlayersReady ? (
                <div>
                  Look at console
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
                            <button type="submit">Send</button>
                        </form>
                        <ul></ul>
                    </div>
                </div>
            )}
        </div>
    );
};
