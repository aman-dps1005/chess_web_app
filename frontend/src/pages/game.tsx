import { useSocket } from "../../hooks/socket";
import { Chess } from "chess.js";
import { useState, useEffect } from "react";
import { ChessBoard } from "../../components/chessBoard";

export const INIT_MESSAGE = "init_game";
export const MOVE = "move";
export const GAMEOVER = "game_over";
export const VALID = "valid move";
export const INVALID = "invalid move";

export const Game = () => {
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [playerRole, setPlayerRole] = useState<string | null>("");

    useEffect(() => {
        if (!socket) {
           return;
        }

        socket.onmessage=(event)=>{
            const message=JSON.parse(event.data);

            switch (message.type){
                case INIT_MESSAGE:
                    setBoard(chess.board());
                    setPlayerRole(message.payload.color);
                    break;
                case MOVE:{
                    const move=message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("move made");
                    break;
                }
                case GAMEOVER:
                    console.log("Game over");
                    break;
            }
        }
    }, [socket]);

    /*
     socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log("Received message:", message); // Debugging line

                if (message.type === INIT_MESSAGE) {
                    setPlayerRole(message.payload.color); // Assign player role based on server response
                    console.log("Player role set to:", message.payload.color); // Debugging line
                }
            };

            // Clean up the listener on component unmount
            return () => {
                socket.onmessage = null;
            };
     */
    useEffect(() => {
        console.log("Updated playerRole:", playerRole);
    }, [playerRole]);
    

    const handlePlayButtonClick = () => {
        if (socket) {
            socket.send(
                JSON.stringify({
                    type: INIT_MESSAGE,
                })
            );
            console.log("Sent INIT_MESSAGE to server"); // Debugging line
        }
    };

    return (
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 h-screen">
            <div className="flex justify-center">
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                    <div className={`col-span-4 w-full flex justify-center bg-green-400 ${playerRole === "Black" ? "rotate-180" : ""}`}>
                            <ChessBoard board={board} socket={socket} setBoard={setBoard} chess={chess} playerRole={playerRole}/>
                        </div>
                        <div className="col-span-2 bg-green-200 w-full flex justify-center rounded-lg">
                            <div className="pt-8">
                                <button
                                    onClick={handlePlayButtonClick}
                                    className="py-4 px-8 rounded-lg font-bold text-2xl bg-green-500 text-white flex items-center gap-4 m-4 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500"
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                        <div>{playerRole}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
