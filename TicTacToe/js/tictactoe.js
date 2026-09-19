// Keeps track of the nine Tic Tac Toe squares
let board = ["", "", "", "", "", "", "", "", ""];

// Player X starts the game
let currentPlayer = "X";

// Determines whether the game is still running
let gameActive = true;

// Gets the elements from the HTML page
const squares = document.querySelectorAll(".square");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

// All possible winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Runs whenever a player clicks one of the squares
function handleSquareClick(event) {

    const clickedSquare = event.target;
    const clickedIndex = Number(clickedSquare.dataset.index);

    // Prevents a player from selecting an occupied square
    // or continuing after the game has finished
    if (board[clickedIndex] !== "" || !gameActive) {
        return;
    }

    // Places the current player's symbol in the selected square
    board[clickedIndex] = currentPlayer;
    clickedSquare.textContent = currentPlayer;

    // Check whether the move created a winner
    checkResult();
}

// Checks the board for a win or tie
function checkResult() {

    let roundWon = false;

    // Check every possible winning combination
    for (let i = 0; i < winningConditions.length; i++) {

        const condition = winningConditions[i];

        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        // Ignore combinations containing an empty square
        if (a === "" || b === "" || c === "") {
            continue;
        }

        // If all three squares match, the current player won
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Stop the game when somebody wins
    if (roundWon) {
        statusText.textContent = "Player " + currentPlayer + " wins!";
        gameActive = false;
        return;
    }

    // Check whether every square has been selected
    const roundDraw = !board.includes("");

    if (roundDraw) {
        statusText.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    // Change from X to O or from O to X
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = "Player " + currentPlayer + "'s turn";
}

// Resets the game so the players can start again
function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    // Clear the stored board
    board = ["", "", "", "", "", "", "", "", ""];

    // Clear X and O from every square
    squares.forEach(function (square) {
        square.textContent = "";
    });

    statusText.textContent = "Player X's turn";
}

// Adds a click event to every square
squares.forEach(function (square) {
    square.addEventListener("click", handleSquareClick);
});

// Runs restartGame when the Restart Game button is clicked
restartButton.addEventListener("click", restartGame);