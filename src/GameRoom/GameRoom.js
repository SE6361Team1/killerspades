import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export const GameRoom = () => {
    const {roomId} = useParams();
    const socketRef = useRef(null);
    const inputRef = useRef(null);
    
    useEffect(() => {
        socketRef.current = io('http://localhost:3001');
        if (roomId) {
            socketRef.current.emit('joinRoom', roomId);
        }

        // listen for messages, display in list
        socketRef.current.on("message", (data) => {
            console.log(data);
            const li = document.createElement('li');
            li.innerText = data;
            document.querySelector('ul').appendChild(li);
        });

        return () => {
            socketRef.current.emit('leaveRoom', roomId);
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputRef.current && inputRef.current.value) {
            socketRef.current.emit('chatMessage', { text: inputRef.current.value, room: roomId });
            inputRef.current.value = "";
        }
    };

    // Below is the functionality for Player Ready Buttons.
    function PlayerReady() {
        const [counter, setCounter] = useState(1);
    
        const buttonClicked = () => {
                setCounter(counter+1);
                alert("Player is ready!");
                if (counter == 4) {
                    setCounter(1);
                    alert("All players are ready!");
                }
        }
            
        return (
            <div>
            <div>
                <button onClick={buttonClicked}>Player 1 Ready?</button>
            </div>
            <div>
                <button onClick={buttonClicked}>Player 2 Ready?</button>
            </div>
            <div>
                <button onClick={buttonClicked}>Player 3 Ready?</button>
            </div>
            <div>
                <button onClick={buttonClicked}>Player 4 Ready?</button>
            </div>
            </div>
        );
    }

    return (
        <div>
        <div> Welcome to Game Room {roomId} </div>
            {PlayerReady()}
            <div>
                <form onSubmit={sendMessage}>
                    <input ref={inputRef} type="text" placeholder="Your message"></input>
                    <button type="submit">Send</button>
                </form>
                <ul></ul>
            </div>
        </div>
    );
};

// Player ready functionality