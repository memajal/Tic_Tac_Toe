// JavaScript source code

/* create a module Gameboard */

const GameBoard = (() => {
    // create an array with 9 elements that will be the gameborard sqauares
    let gameBoardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    // create a function to create a 9 square grid when the user click start
    const createGameBoard = () => {
        let boardHTML = "";

        /*for each element of gameBoard array add a div with class board_sqare and the id of the specific element */
        for (let i = 0; i < gameBoardArray.length; i++)  {
            boardHTML+=`<div class="board_square" id=${i}></div>`         
        }     
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }

    //update function to update the array of the gameBoard with the values entered by the user
    const updateGameBoard = (index, value) => {
        gameBoardArray[index] = value;
    }


    return {
        createGameBoard,
        updateGameBoard,
        gameBoardArray,
    }
})();


// module for display Controller 
const displayController = (() => {
    const addMessage = (message) => {
        document.querySelector("#display_message").innerHTML = message;
        console.log(message);
    }

    return {
        addMessage
    }
})();


// use a factory to create players because we have multiple players
const createPlayers = (name, symbol) => {
    return { name, symbol };

}


/* create the logic to start the game  with the module StartGame*/
const StartGame = (() => {

    let Players = [];  /*array that holds the 2 players */
    let currentPlayerIndex = 1;
    let currentPlayerSymbol;

    //function to start the game
    const start = () => {
        //the create of Player Objects
        Players = [
            createPlayers(document.querySelector("#player1").value, "X"),
            createPlayers(document.querySelector("#player2").value, "O"),
        ]
     
    
        // call the crateGameBoard here
        console.log(Players, currentPlayerIndex);
        GameBoard.createGameBoard();

        // create an event listener click every time the user click in one of the gameboard squares and print the sqare id
        const squares = document.querySelectorAll(".board_square");

        squares.forEach((square) => {
            square.addEventListener("click", () => {

               
                //set the playerIndex and symbol only when the div is not filled
                if (square.innerHTML == "") {
                    if (currentPlayerIndex == 0) {
                        currentPlayerIndex = 1;
                        currentPlayerSymbol = Players[currentPlayerIndex].symbol;
                        square.innerHTML = currentPlayerSymbol;
                    }

                    else if (currentPlayerIndex == 1) {
                        currentPlayerIndex = 0;
                        currentPlayerSymbol = Players[currentPlayerIndex].symbol;
                        square.innerHTML = currentPlayerSymbol;
                    }
                    
                    GameBoard.updateGameBoard(square.id, currentPlayerSymbol);
                   
                }
 
                

                if (gameOver(GameBoard.gameBoardArray)) {
                    displayController.addMessage("Game ended! " + Players[currentPlayerIndex].name + " won!")
                    restart();
                }

                else if (gameDraw(GameBoard.gameBoardArray))   {
                    displayController.addMessage("Game ended! Its a draw!")

                    restart();
                  
                }
               
                console.log(GameBoard.gameBoardArray, gameOver(GameBoard.gameBoardArray));
                return currentPlayerIndex; //return to use to the restart
          

               
             }
               
            );
        });
    }

    const restart = () => {
        let gameboardDivs = document.querySelector("#gameboard").children;
        for (let i = 0; i < 9; i++) {
            // update the array of the gameBoard with empty values and update the innerHtml of the divs
            GameBoard.updateGameBoard(i, " ");
            gameboardDivs[i].innerHTML="";
        }
        //set the playerIndex 1
        currentPlayerIndex = 1;

    }

    //export start to be used outside the module
   return {
       start,
       restart,
    }

})();


function gameOver(board) {
    // winning combintions index of the gameBoard

    const winnerCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
   
    //
    for (let i = 0; i < winnerCombination.length; i++) {
        //control if the array has one of these combination, if yes, return true, else false
        const [a, b, c] = winnerCombination[i];
        if (board[a] != " " && board[b] != " " && board[c] != " " && board[a] === board[b] && board[a] === board[c]) {

            return true;
        }
      
    }
 
return false;

}

// function to controll if no one has won 
function gameDraw(board) {

    if (board.includes(" ", 0)) {
        return false;
        }
    
    return true;
}




let startGameButton = document.querySelector("#start_game");
startGameButton.addEventListener("click", () => {
    StartGame.start(); 

});
