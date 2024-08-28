const chessPiecesSymbol=(boxType:string,boxColor:string)=>{
    if(boxType==='k'){
        if(boxColor==='w'){
            return '♔';
        }
        else{
            return '♚'
        }
    }
    if(boxType==='q'){
        if(boxColor==='w'){
            return '♕';
        }
        else{
            return '♛';
        }
    }

    if(boxType==='b'){
        if(boxColor==='w'){
            return '♗';
        }
        else{
            return '♝';
        }
    }
    if(boxType==='n'){
        if(boxColor==='w'){
            return '♘';
        }
        else{
            return '♞';
        }
    }
    if(boxType==='p'){
        if(boxColor==='w'){
            return '♙';
        }
        else{
            return '♟';
        }
    }
    if(boxType==='r'){
        if(boxColor==='w'){
            return '♖';
        }
        else{
            return '♜';
        }
    }


    
}

export default chessPiecesSymbol;