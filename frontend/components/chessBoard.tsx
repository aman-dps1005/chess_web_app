import { Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";

export const ChessBoard = ({
  board, socket
}: {
  board: (
    | {
        square: Square;
        type: PieceSymbol;
        color: Color;
      }
    | null
  )[][];
  socket: WebSocket | null;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);
  const colorEven = '#57a023'; // Dark green
  const colorOdd = 'white';  // Light green

  return (
    <div className="text-white-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <div
              key={j}
              className="w-20 h-20 flex flex-col justify-center items-center"  style={{
                backgroundColor: (i + j) % 2 === 0 ? colorEven : colorOdd,
              }} onClick={()=>{
                if(!from){
                    setFrom(square?.square??null);
                }
                else{
                    setTo(square?.square?? null);
                    socket?.send(JSON.stringify({
                        type:"move",
                        payload:{
                            from:from,
                            to:square?.square
                        }
                    }))
                    setFrom(null);
                    console.log({
                        from,
                        to:square?.square
                    })
                }
              }}>
              {square ? square.type : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
