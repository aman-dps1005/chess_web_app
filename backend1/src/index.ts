import { WebSocketServer } from "ws";
import gameManager from "./GameManager";

const wss=new WebSocketServer({port:8080});


wss.on('connection',function connection(ws){
    ws.on("error",console.error);
    gameManager.addUser(ws);
    ws.on("disconnect",()=>gameManager.removeUser(ws));
})