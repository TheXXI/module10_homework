const button = document.querySelector('#btn');

button.addEventListener('click', () => {
    alert(`Ширина экрана: ${window.screen.width}, высота экрана: ${window.screen.height}`);
});