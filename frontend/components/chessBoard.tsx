import { Color, PieceSymbol, Square } from "chess.js";
import chessPieceSymbols from "../hooks/getPiecesunicode";
import { useState } from "react";
import { MOVE } from "../src/pages/game";
import { Chess } from "chess.js";
export const ChessBoard=(
    {board, socket,setBoard,chess,playerRole}: {
        chess:Chess;
        board: (
          | {
              square: Square;
              type: PieceSymbol;
              color: Color;
            }
          | null
        )[][],
        socket: WebSocket | null;
        setBoard:any;
        playerRole:string|null;
      })=>{
    //const [from, setFrom] = useState<null | Square>(null);
    //const [to, setTo] = useState<null | Square>(null);

    const darkColor = "#84ac5c";
    const lightColor = "#dbecc9";
    const [from,setFrom]=useState<Square|null>();
    //const [to,setTo]=useState<Square|null>();


    async function handleClick(squareRepresentation: Square) {
    if (!from) {
        // If 'from' is not set, set it to the clicked square
        setFrom(squareRepresentation);
    } else {
        // If 'from' is set, make the move
        const move = { from, to: squareRepresentation };

        // Update the chess position
        // Send the move to the server
        socket?.send(JSON.stringify({
            type: MOVE,
            payload: move,
        }));

        setFrom(null);
        // Update the board state
        chess.move(move)
        setBoard(chess.board());

        // Reset 'from' and 'to' states
        
    }
    console.log(from, squareRepresentation);
}

return (
    <div className="text-white-200">
        {board.map((row, index) => (
            <div key={index} className="flex">
                {row.map((box, boxIndex) => {
                    const squareRepresentation=String.fromCharCode(97+boxIndex)+""+(8-index) as Square;
                    return (
                        <div
                            key={boxIndex}
                            className="flex flex-col justify-center items-center"
                            style={{
                                backgroundColor: (index + boxIndex) % 2 === 0 ? lightColor : darkColor,
                                width:'5rem',
                                height:'5rem'
                            }}
                            data-row={index}
                            data-col={boxIndex}
                            onClick={()=>{handleClick(squareRepresentation)}}
                        >
                            {/* Optionally render the chess piece or an empty box */}
                            <div  className={`w-full h-full flex justify-center items-center ${box?.color === 'b' ? 'text-black' : 'text-white'} ${playerRole=="Black"?"rotate-180":""}`}>
                                {box?.type ? <span className="text-4xl font-bold ">{chessPieceSymbols(box.type,box.color)}</span> : null}
                            </div>
                            
                            
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
);

    
}