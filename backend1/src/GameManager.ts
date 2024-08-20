import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_MESSAGE, MOVE } from "./messages";
//interface Game{
    //don't make interface make it a class instead
//}
//we need a Game class and user class for pending user
class GameManager{
    private games:Game[];
    private PendingUser:WebSocket | null;
    private users:WebSocket[];

    private static instance:GameManager;

    private constructor (){
        this.games=[];
        this.users=[];
        this.PendingUser=null;
    }

    public static gameManager(){
        if(!GameManager.instance){
            GameManager.instance=new GameManager();
        }

        return GameManager.instance;
    } 
    //methods
    addUser(socket:WebSocket){
        this.users.push(socket);
        this.handleMessage(socket);
    }

    removeUser(socket:WebSocket){
        this.users=this.users.filter(user=>user!=socket);
        //stop the game here because the user left
    }


    private handleMessage(socket:WebSocket){
        socket.on("message",(data)=>{
            const message=JSON.parse(data.toString());
            //here we converted the user sent string to json and stored it in message
            //the user from front end will send the object in the message which will have a key type inside this object
            //When you send data over WebSockets, you often need to send more than just a plain string.
            //You might need to send an object with multiple properties, like { type: "init_game", playerId: 123, action: "move" }.
            // JSON allows you to encode this complex data into a string that can be easily transmitted.
            if(message.type===INIT_MESSAGE){
                if(this.PendingUser){
                    //start the game
                    const game=new Game(this.PendingUser,socket);
                    this.games.push(game);
                    this.PendingUser=null;
                }
                else{
                    this.PendingUser=socket;
                }
            }

            if(message.type===MOVE){
                //find the game with the player i.e the given socket
                const game=this.games.find(game=>game.player1===socket || game.player2===socket);
                
                //? implies if the game exist them make a move
                //game?.makeMove(socket,message.move);

                if(game){
                    game.makeMove(socket,message.move);
                }
            }
        })
    }
}


const gameManager=GameManager.gameManager();
export default gameManager;
