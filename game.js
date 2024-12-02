const prompt= require('prompt-sync')()

let gameState = "Active"
let currentPlayer = "🐭"
let gameBoard = [" "," "," "," "," "," "," "," "," "]

function main(){
    while (gameState === "Active"){
        
        let position = prompt(`Player ${currentPlayer} enter your position : `)
        if (position >= 0 && position <= 8) {
            gameState,reason=fillPosition(position);
        }
        else{
            console.error("Invalid position",position)
            console.log("Choose between 0 and 8")
        }

        if (reason == "win"){
            console.log(`Player ${currentPlayer} won,Congratulations!`)
            displayBoard();
            return;
        }
        else if (reason == "draw"){
            console.log("Game Draw!")
            displayBoard();
            return;
        }
        else{
            displayBoard();
        }
        
    }
    
    return ;
}

function displayBoard(){
    console.log(`
        ${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}
        ----------
        ${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}
        ----------
        ${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}
        `)
}

function fillPosition(position){
    let fill= false
    if (gameBoard[position] == " "){
        gameBoard[position]=currentPlayer;
        fill = true;
    }
    else{
        console.log("Position already filled.Choose another position");
    }
    if(checkWin()){
        return "Inactive","win"
    }
    else if(checkDraw()){
        return "Inactive","draw"
    }
    else{
        if(fill){
            currentPlayer = currentPlayer === "🐭" ? "🐷":"🐭"
        }
        else{
            currentPlayer = currentPlayer
        }
        return "active","in-progress";
    }
}

function checkWin(){
    const conditions =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6]
      ]
    return conditions.some(condition => {
        let [a,b,c]=condition
        return gameBoard[a] == currentPlayer &&
       gameBoard[b] == currentPlayer &&
       gameBoard[c] == currentPlayer;
    })
}

function checkDraw() {
     return gameBoard.every(place => place !== " ")
}

main()