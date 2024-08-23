import { useNavigate } from "react-router-dom";
//import {Button} from "../../components/buttonComponent";
export const Landing=()=>{
    const navigate=useNavigate();

    return <div className="bg-gradient-to-b from-slate-800 via-slate-700 to-slate-500 h-screen">
        <div className="flex justify-center grid-col-6 gap-4 h-screen pt-8">
            <div className="h-1/4 w-1/4 col-span-5">
                <img src="/chessBoard.jpeg" className="rounded-lg"/>
            </div>            
            <div className="flex flex-col col-span-1 item-center">
                <h1 className="text-4xl font-bold text-white text-center m-4">Play chess online on the #2 site! </h1>
                <button className="p-4 rounded-lg bg-green-500 text-white flex items-center gap-4 m-4 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500"
                    onClick={()=>{
                        navigate("/game");
                    }}
                    >
                         <div className="col-span-2 h-10 w-10 self-center">
                        <img src="/strategy.png"/>
                    </div>
                    <div className="col-span-9">
                        <div className="font-bold text-white text-2xl text-start">Play Online</div>
                        <p className="text-sm text-white">play with someone at your level</p>
                    </div>
                    </button>
                   
            </div>
        </div>
    </div>
}

//function clickHandle(){
//    console.log("connected");
//}