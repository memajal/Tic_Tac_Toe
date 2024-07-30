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
            boardHTML+=`<div class="board_square" id=square-${i}></div>`
            
           
        }

          
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }

   

    return {
        createGameBoard,
    }


})();




let startGameButton = document.querySelector("#start_game");
startGameButton.addEventListener("click", () => {

    GameBoard.createGameBoard();

}

);
