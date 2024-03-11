import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export const GameRoom = () => {
    const {roomId} = useParams();
    const socketRef = useRef(null);
    const inputRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    useEffect(() => {
        socketRef.current = io('http://localhost:3001');
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
        })

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

    //Client side button press
    const buttonClicked = () =>{
        socketRef.current.emit("playerReady", roomId)
        setIsButtonDisabled(true)
    }

    return (
        <div>
        <div> Welcome to Game Room {roomId} </div>
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
    );
};
