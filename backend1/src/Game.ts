import { WebSocket } from "ws";
import {Chess} from "chess.js";
import { GAMEOVER, INIT_MESSAGE, MOVE } from "./messages";
export class Game{
    player1:WebSocket;
    player2:WebSocket;
    //private board:string;//you can represent a chess board with a string
    //private moves:string[];
    //rather than maintaining a board or chess we can use chess.js library for a default board that updated with moves
    private board:Chess;
    private startTime:Date;
    private moveCount:number;


    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        //this.board="";
        //this.moves=[];
        this.board=new Chess();
        this.startTime=new Date();
        //whenever the game starts let both the parties know
        this.moveCount=0;

        this.player1.send(JSON.stringify({
            //type and payload are just for convinience you can name them anything the websocket will transfer it as a string
            type:INIT_MESSAGE,
            payload:{
                color:"White"
            }
            
        }));
        this.player2.send(JSON.stringify({
            type:INIT_MESSAGE,
            payload:{
                color:"Black"
            }
        }));
    }


    makeMove(socket:WebSocket,move:{
        from:string,
        to:string
    }){
        //if it is an odd number of move the player should be player1
        if(this.moveCount%2===0 && socket!=this.player1){
            return;
        }
        //if it is an even number of move then player should be player2
        if(this.moveCount%2===1 && socket!=this.player2){
            return ;
        }


        //validate the move
        try{
            this.board.move({from:move.from,to:move.to});
            this.moveCount++;
        }
        catch(e){
            //.move throws an error
            return;
            //this means it was an invalid move
        }

        //updation of board is done by chess.js

        //if game is over inform both the parties

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAMEOVER,
                payload:{
                    //if the next turn was of white but the game is over the black won
                    winner: this.board.turn()==="w"?"Black":"White"
                }
            }));

            this.player2.send(JSON.stringify({
                type:GAMEOVER,
                payload:{
                    //if the next turn was of white but the game is over the black won
                    winner: this.board.turn()==="w"?"Black":"White"
                }
            }));

            return ;

        }

        //if the game is not over then tell next turn;
        if(this.moveCount%2===0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        //movecount goes everytime there is a valid move
        this.moveCount++;

    }
};