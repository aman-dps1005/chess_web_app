import {useSocket} from "../../hooks/socket";
import { Chess } from "chess.js";
import {ChessBoard} from "../../components/chessBoard";
import { useState,useEffect } from "react";


export const INIT_MESSAGE="init_game";
export const MOVE="move";
export const GAMEOVER="game_over";

export const Game=()=>{
    const socket=useSocket();
    const [chess,setChess]=useState(new Chess());
    const [board,setBoard]=useState(chess.board());

    useEffect(()=>{
        if(!socket){
            return;
        }

        socket.onmessage=(event)=>{
            const message=JSON.parse(event.data);
            console.log(message);
            switch (message.type){
                case INIT_MESSAGE:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("game has started");
                    break;
                case MOVE:{
                    const move=message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("move made");
                    break;
                }
                case GAMEOVER:
                    console.log("game over");
                    break;
            }
        }
    },[socket,chess])
    
    if(!socket){
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-500">
                    <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">Loading...</span>
                    </div>

                    
                </div>
                
    }

    return(
        <div className="bg-gradient-to-b from-slate-800 via-slate-700 to-slate-500 h-screen">
             <div className="flex justify-center">
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                        <div className="col-span-4 w-full flex justify-center">
                            <ChessBoard board={board} socket={socket}/>
                        </div>
                        <div className="col-span-2 bg-green-200 w-full flex justify-center rounnded-xl">
                            <div className="pt-8">
                            <button onClick={()=>{
                                socket?.send(JSON.stringify({
                                    type:INIT_MESSAGE
                                }))
                            }} className="py-4 px-8 rounded-lg font-bold text-2xl bg-green-500 text-white flex items-center gap-4 m-4 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500">Play</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
           
    )
}