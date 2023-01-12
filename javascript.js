const elementFactory = (selector) => {
    const findElement = () => document.querySelector(selector);
    return { findElement };
};

const startButton = elementFactory('button#startButton');
const form = elementFactory('form');
const playButton = elementFactory('button#playButton');

startButton.findElement().addEventListener('click', () => {
    form.findElement().setAttribute('style', 'display: flex;');
    startButton.findElement().setAttribute('style', 'display: none;');
});

const playerFactory = (name, symbol) => ({ name, symbol });

const scoreboard = (function () {
    let playerOneScore = 0;
    let playerTwoScore = 0;

    // Create the scoreboard element after the user starts the game
    const makeBoard = () => {
        const scoreboardElement = document.createElement('div');
        scoreboardElement.classList.add('scoreboard');

        const playerOneElement = document.createElement('div');
        playerOneElement.classList.add('playerOne');
        const playerOneNameElement = document.createElement('p');
        const playerOneScoreElement = document.createElement('p');
        playerOneElement.appendChild(playerOneNameElement);
        playerOneElement.appendChild(playerOneScoreElement);

        const playerTwoElement = document.createElement('div');
        playerTwoElement.classList.add('playerTwo');
        const playerTwoNameElement = document.createElement('p');
        const playerTwoScoreElement = document.createElement('p');
        playerTwoElement.appendChild(playerTwoNameElement);
        playerTwoElement.appendChild(playerTwoScoreElement);

        const turnElement = document.createElement('p');
        turnElement.classList.add('turn');

        scoreboardElement.appendChild(playerOneElement);
        scoreboardElement.appendChild(playerTwoElement);
        scoreboardElement.appendChild(turnElement);
        document
            .querySelector('div.mainContent')
            .appendChild(scoreboardElement);
    };

    // Display score at the beginning and end of each round for the user
    const displayScore = (playerOneName, playerTwoName) => {
        const playerOneNameElement = elementFactory(
            'div.playerOne>p:first-child'
        );
        playerOneNameElement.findElement().textContent = `Player 1: ${playerOneName}`;
        const playerOneScoreElement = elementFactory(
            'div.playerOne>p:nth-child(2)'
        );
        playerOneScoreElement.findElement().textContent = playerOneScore;

        const playerTwoNameElement = elementFactory(
            'div.playerTwo>p:first-child'
        );
        playerTwoNameElement.findElement().textContent = `Player 2: ${playerTwoName}`;
        const playerTwoScoreElement = elementFactory(
            'div.playerTwo>p:nth-child(2)'
        );
        playerTwoScoreElement.findElement().textContent = playerTwoScore;
    };

    // Once a turn is over, display the next person's turn
    const displayTurn = (name) => {
        document.querySelector('p.turn').textContent = `It's ${name}'s turn`;
    };

    // Give a point to whoever won the round
    const awardPoint = (name, playerOne, result) => {
        if (result === 'winner') {
            if (name === playerOne.name) {
                playerOneScore += 1;
            } else {
                playerTwoScore += 1;
            }
        }
    };

    return { makeBoard, displayScore, displayTurn, awardPoint };
})();

const gameboard = (function () {
    const gameArray = [];

    // Make and display the gameboard after the user starts the game
    const makeBoard = () => {
        const gameboardElement = document.createElement('div');
        gameboardElement.classList.add('gameboard');
        document.querySelector('div.mainContent').appendChild(gameboardElement);

        // Create all nine tic-tac-toe squares
        for (let i = 0; i < 9; i += 1) {
            const gameSquareElement = document.createElement('div');
            gameboardElement.appendChild(gameSquareElement);
        }
    };

    // Return a nodelist of the gameboard squares
    const getSquares = () => document.querySelectorAll('div.gameboard>div');

    /* Using all the possible ways to win, check if there is a winner after each round. 
    After 9 turns, the round is over and results in a draw */
    const checkBoard = (symbol, turn) => {
        if (
            gameArray[0].textContent === symbol &&
            gameArray[1].textContent === symbol &&
            gameArray[2].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[3].textContent === symbol &&
            gameArray[4].textContent === symbol &&
            gameArray[5].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[6].textContent === symbol &&
            gameArray[7].textContent === symbol &&
            gameArray[8].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[0].textContent === symbol &&
            gameArray[3].textContent === symbol &&
            gameArray[6].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[1].textContent === symbol &&
            gameArray[4].textContent === symbol &&
            gameArray[7].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[2].textContent === symbol &&
            gameArray[5].textContent === symbol &&
            gameArray[8].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[0].textContent === symbol &&
            gameArray[4].textContent === symbol &&
            gameArray[8].textContent === symbol
        ) {
            return 'winner';
        }
        if (
            gameArray[2].textContent === symbol &&
            gameArray[4].textContent === symbol &&
            gameArray[6].textContent === symbol
        ) {
            return 'winner';
        }

        if (turn === 9) {
            return 'draw';
        }

        return '';
    };

    return { gameArray, makeBoard, getSquares, checkBoard };
})();

playButton.findElement().addEventListener('click', () => {
    // Create two players as objects based on user input
    const playerOneInput = elementFactory('input#playerOneName');
    const playerOneName = playerOneInput.findElement().value;
    const playerTwoInput = elementFactory('input#playerTwoName');
    const playerTwoName = playerTwoInput.findElement().value;

    const playerOne = playerFactory(playerOneName, 'X');
    const playerTwo = playerFactory(playerTwoName, 'O');

    form.findElement().setAttribute('style', 'display: none;');
    playButton.findElement().setAttribute('style', 'display: none;');

    scoreboard.makeBoard();
    scoreboard.displayScore(playerOne.name, playerTwo.name);
    scoreboard.displayTurn(playerOne.name);

    gameboard.makeBoard();
    let playerTurn;
    let turn = 0;
    let symbol;
    let endGame = false;
    gameboard.getSquares().forEach((square) => {
        gameboard.gameArray.push(square);
        square.addEventListener('click', (event) => {
            // If the square is empty and the round has not ended, allow the user to interact with the square
            if (event.target.textContent === '' && !endGame) {
                turn += 1;
                // If the playerTurn variable is set to the last player, that means the next player has yet to go
                if (playerTurn === 'playerTwo') {
                    symbol = playerTwo.symbol;
                    scoreboard.displayTurn(playerOne.name);
                    playerTurn = 'playerOne';
                } else {
                    symbol = playerOne.symbol;
                    scoreboard.displayTurn(playerTwo.name);
                    playerTurn = 'playerTwo';
                }
                event.target.textContent = symbol;
                const result = gameboard.checkBoard(symbol, turn);
                // If the result is not empty, it is either a draw or a win
                if (result !== '') {
                    const resultDisplay = elementFactory('div.result>p');
                    let winningPlayer;
                    if (result === 'winner') {
                        if (symbol === 'X') {
                            winningPlayer = playerOne.name;
                        } else {
                            winningPlayer = playerTwo.name;
                        }
                        resultDisplay.findElement().textContent = `${winningPlayer} is the winner!`;
                    } else if (result === 'draw') {
                        resultDisplay.findElement().textContent = `It's a draw!`;
                    }

                    document
                        .querySelector('div.result')
                        .setAttribute('style', 'display: flex;');
                    scoreboard.awardPoint(winningPlayer, playerOne, result);
                    scoreboard.displayScore(playerOne.name, playerTwo.name);

                    // Display the result of the round along with possible options after the round is over
                    const newRoundButton = document.createElement('button');
                    const newGameButton = document.createElement('button');

                    newRoundButton.textContent = 'New Round';
                    document
                        .querySelector('div.result')
                        .appendChild(newRoundButton);
                    // Keep the score but clear everything else out to start a new round
                    newRoundButton.addEventListener('click', () => {
                        gameboard.gameArray = [];
                        turn = 0;
                        playerTurn = '';
                        endGame = false;
                        document
                            .querySelector('div.result')
                            .setAttribute('style', 'display: none;');
                        gameboard.getSquares().forEach((gameSquare) => {
                            gameSquare.textContent = '';
                            gameboard.gameArray.push(gameSquare);
                        });
                        scoreboard.displayTurn(playerOne.name);
                        newRoundButton.remove();
                        newGameButton.remove();
                    });

                    // Reload the webpage to start a new game
                    newGameButton.textContent = 'New Game';
                    document
                        .querySelector('div.result')
                        .appendChild(newGameButton);
                    newGameButton.addEventListener('click', () => {
                        window.location.reload();
                    });

                    endGame = true;
                }
            }
        });
    });
});
