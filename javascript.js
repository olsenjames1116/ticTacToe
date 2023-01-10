const elementFactory = (selector) => {
    const findElement = document.querySelector(selector);
    return { findElement };
};

const startButton = elementFactory('button#startButton');
const form = elementFactory('form');
const playButton = elementFactory('button#playButton');

startButton.findElement.addEventListener('click', () => {
    form.findElement.setAttribute('style', 'display: block;');
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

        scoreboardElement.appendChild(playerOneElement);
        scoreboardElement.appendChild(playerTwoElement);
        document.querySelector('body').appendChild(scoreboardElement);
    };

    const displayScore = (playerOneName, playerTwoName) => {
        const playerOneNameElement = document.querySelector(
            'div.playerOne>p:first-child'
        );
        playerOneNameElement.textContent = playerOneName;
        const playerTwoNameElement = document.querySelector(
            'div.playerTwo>p:first-child'
        );
        playerTwoNameElement.textContent = playerTwoName;
    };
    return { makeBoard, displayScore };
})();

const gameboard = (function () {
    const makeBoard = () => {
        const gameboardElement = document.createElement('div');
        gameboardElement.classList.add('gameboard');
        document.querySelector('body').appendChild(gameboardElement);

        for (let i = 0; i < 9; i += 1) {
            const gameSquareElement = document.createElement('div');
            gameboardElement.appendChild(gameSquareElement);
        }
    };
    return { makeBoard };
})();

playButton.findElement.addEventListener('click', () => {
    const playerOneInput = elementFactory('input#playerOneName');
    const playerOneName = playerOneInput.findElement.value;
    const playerTwoInput = elementFactory('input#playerTwoName');
    const playerTwoName = playerTwoInput.findElement.value;

    const playerOne = playerFactory(playerOneName, 'X');
    const playerTwo = playerFactory(playerTwoName, 'O');
    playerOne.displayName();
    playerTwo.displayName();

    scoreboard.makeBoard();
    scoreboard.displayScore(playerOne.name, playerTwo.name);

    gameboard.makeBoard();

    startButton.findElement.setAttribute('style', 'display: none;');
    form.findElement.setAttribute('style', 'display: none;');
    playButton.findElement.setAttribute('style', 'display: none;');
});
