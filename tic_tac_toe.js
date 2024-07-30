// JavaScript source code

/* create a module Gameboard */

const GameBoard = (() => {
    // create an array with 9 elements that will be the gameborard sqauares
    let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    // create a function to create a 9 square grid when the user click start
    const createGameBoard = () => {
        let boardHTML = "";

        /*for each element of gameBoard array add a div with class board_sqare and the id of the specific element */
        for (let i = 1; i <= gameBoard.length; i++)  {
            boardHTML+=`<div class="board_square" id=${i}></div>`         
        }     
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }
    return {
        createGameBoard,
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
               
                if (currentPlayerIndex == 0) {
                    currentPlayerIndex = 1;
                    currentPlayerSymbol = Players[currentPlayerIndex].symbol;

                }

                else if (currentPlayerIndex == 1) {
                    currentPlayerIndex = 0;
                    currentPlayerSymbol= Players[currentPlayerIndex].symbol;
                }

                console.log(square.id, currentPlayerIndex, currentPlayerSymbol);
            }
            );
        });
    }

    //export start to be used outside the module
   return {
       start,
    }



})();




let startGameButton = document.querySelector("#start_game");
startGameButton.addEventListener("click", () => {
    StartGame.start();
   

}

);
