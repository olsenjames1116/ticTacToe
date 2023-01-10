const startButton = (function () {
    const buttonElement = document.querySelector('button');
    buttonElement.addEventListener('click', () => {
        const form = document.querySelector('form');
        form.setAttribute('style', 'display: block');
    });
})();
