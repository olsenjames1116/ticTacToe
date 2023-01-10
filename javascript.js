const elementFactory = (selector) => {
    const findElement = document.querySelector(selector);
    return { findElement };
};

const startButton = elementFactory('button#startButton');
const form = elementFactory('form');

startButton.findElement.addEventListener('click', () => {
    form.findElement.setAttribute('style', 'display: block;');
});

const playerFactory = (name, symbol) => {
    const displayName = () => {
        console.log(`Player: ${name}`);
    };
    return { name, symbol, displayName };
};

const gameboardFactory = function () {
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
};

const playButton = elementFactory('button#playButton');

playButton.findElement.addEventListener('click', () => {
    const playerOneInput = elementFactory('input#playerOneName');
    const playerOneName = playerOneInput.findElement.value;
    const playerTwoInput = elementFactory('input#playerTwoName');
    const playerTwoName = playerTwoInput.findElement.value;

    const playerOne = playerFactory(playerOneName, 'X');
    const playerTwo = playerFactory(playerTwoName, 'O');
    playerOne.displayName();
    playerTwo.displayName();

    const gameboard = gameboardFactory();
    gameboard.makeBoard();

    startButton.findElement.setAttribute('style', 'display: none;');
    form.findElement.setAttribute('style', 'display: none;');
    playButton.findElement.setAttribute('style', 'display: none;');
});
