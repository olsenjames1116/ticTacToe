const elementFactory = (selector) => {
    const element = document.querySelector(selector);
    return { element };
};

const startButton = elementFactory('button#startButton');
const form = elementFactory('form');

startButton.element.addEventListener('click', () => {
    form.element.setAttribute('style', 'display: block');
});

const playerFactory = (name) => {
    const displayName = () => {
        console.log(`Player: ${name}`);
    };
    return { name, displayName };
};

const playButton = elementFactory('button#playButton');

playButton.element.addEventListener('click', () => {
    const playerOneInput = elementFactory('input#playerOneName');
    const playerOneName = playerOneInput.element.value;
    const playerTwoInput = elementFactory('input#playerTwoName');
    const playerTwoName = playerTwoInput.element.value;

    const playerOne = playerFactory(playerOneName);
    const playerTwo = playerFactory(playerTwoName);
    playerOne.displayName();
    playerTwo.displayName();
});
