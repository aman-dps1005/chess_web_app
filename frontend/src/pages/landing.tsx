import { useNavigate } from "react-router-dom";
import {Button} from "../../components/buttonComponent";
//import {useSocket} from "../../hooks/socket";

export const Landing=()=>{
    //const socket=useSocket();
    const navigate=useNavigate();

    return <div className="bg-slate-700 h-screen">
        <div className="flex justify-center grid-col-6 gap-4 h-screen pt-8">
            <div className="h-1/4 w-1/4 col-span-5">
                <img src="/chessBoard.jpeg" className="rounded-lg"/>
            </div>            
            <div className="flex flex-col col-span-1 item-center">
                <h1 className="text-4xl font-bold text-white text-center m-4">Play chess online on the #2 site! </h1>
                <Button onClick={async()=>{
                    /*await socket?.send(JSON.stringify({
                        type:"init_game"
                    }));*/
                    navigate("/game");
                }}>
                    <div className="col-span-2 h-10 w-10 self-center">
                        <img src="/strategy.png"/>
                    </div>
                    <div className="col-span-9">
                        <div className="font-bold text-white text-2xl text-start">Play Online</div>
                        <p className="text-sm text-white">play with someone at your level</p>
                    </div>
                </Button>
            </div>
        </div>
    </div>
}

//function clickHandle(){
//    console.log("connected");
//}