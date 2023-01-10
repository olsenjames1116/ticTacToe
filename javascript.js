const elementFactory = (selector) => {
    const findElement = () => document.querySelector(selector);
    return { findElement };
};

const startButton = elementFactory('button#startButton');
const form = elementFactory('form');
const playButton = elementFactory('button#playButton');

startButton.findElement().addEventListener('click', () => {
    form.findElement().setAttribute('style', 'display: block;');
});

const playerFactory = (name, symbol) => {
    const displayName = () => {
        console.log(`Player: ${name}`);
    };
    return { name, symbol, displayName };
};

const scoreboard = (function () {
    const playerOneScore = 0;
    const playerTwoScore = 0;

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
        document.querySelector('body').appendChild(scoreboardElement);
    };

    const displayScore = (playerOneName, playerTwoName) => {
        const playerOneNameElement = document.querySelector(
            'div.playerOne>p:first-child'
        );
        playerOneNameElement.textContent = `Player 1: ${playerOneName}`;
        const playerOneScoreElement = document.querySelector(
            'div.playerOne>p:nth-child(2)'
        );
        playerOneScoreElement.textContent = playerOneScore;

        const playerTwoNameElement = document.querySelector(
            'div.playerTwo>p:first-child'
        );
        playerTwoNameElement.textContent = `Player 2: ${playerTwoName}`;
        const playerTwoScoreElement = document.querySelector(
            'div.playerTwo>p:nth-child(2)'
        );
        playerTwoScoreElement.textContent = playerTwoScore;
    };

    const displayTurn = (name) => {
        document.querySelector('p.turn').textContent = `It's ${name}'s turn`;
    };

    return { makeBoard, displayScore, displayTurn };
})();

const gameboard = (function () {
    const gameArray = [];

    const makeBoard = () => {
        const gameboardElement = document.createElement('div');
        gameboardElement.classList.add('gameboard');
        document.querySelector('body').appendChild(gameboardElement);

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
    playerOne.displayName();
    playerTwo.displayName();

    startButton.findElement().setAttribute('style', 'display: none;');
    form.findElement().setAttribute('style', 'display: none;');
    playButton.findElement().setAttribute('style', 'display: none;');

    scoreboard.makeBoard();
    scoreboard.displayScore(playerOne.name, playerTwo.name);
    scoreboard.displayTurn(playerOne.name);

    gameboard.makeBoard();
    let playerTurn;
    let turn = 0;
    let symbol;
    gameboard.getSquares().forEach((square) => {
        gameboard.gameArray.push(square);
        square.addEventListener('click', (event) => {
            if (event.target.textContent === '') {
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
                console.log(result);
            }
        });
    });
});
