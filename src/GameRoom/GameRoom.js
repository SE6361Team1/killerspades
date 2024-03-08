import { useEffect, useRef } from "react";
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

    return (
        <div>
        <div> Welcome to Game Room {roomId} </div>
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