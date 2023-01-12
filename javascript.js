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

    const displayTurn = (name) => {
        document.querySelector('p.turn').textContent = `It's ${name}'s turn`;
    };

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

    const makeBoard = () => {
        const gameboardElement = document.createElement('div');
        gameboardElement.classList.add('gameboard');
        document.querySelector('div.mainContent').appendChild(gameboardElement);

        for (let i = 0; i < 9; i += 1) {
            const gameSquareElement = document.createElement('div');
            gameboardElement.appendChild(gameSquareElement);
        }
    };

    const getSquares = () => document.querySelectorAll('div.gameboard>div');

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
            if (event.target.textContent === '' && !endGame) {
                turn += 1;
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

                    const nextRoundButton = document.createElement('button');
                    const restartButton = document.createElement('button');

                    nextRoundButton.textContent = 'Next Round';
                    document
                        .querySelector('div.result')
                        .appendChild(nextRoundButton);
                    nextRoundButton.addEventListener('click', () => {
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
                        nextRoundButton.remove();
                        restartButton.remove();
                    });

                    restartButton.textContent = 'Restart';
                    document
                        .querySelector('div.result')
                        .appendChild(restartButton);
                    restartButton.addEventListener('click', () => {
                        window.location.reload();
                    });

                    endGame = true;
                }
            }
        });
    });
});
