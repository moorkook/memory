// On charge ici notre gameLogic, qui va nous donner accés a toutes nos methodes pour lancer et faire evoluer le memory
let gameLogic = new GameLogic();

// On definit tout nos event listeners ici, pour pas s'embeter
document.querySelector('[data-action="launchGame"]').addEventListener('click', () => {
    // Initialise le jeu
    gameLogic.init((fruits) => {
        let gameView = document.querySelector('[data-view="jeu"]');
        // On cache le bouton
        document.querySelector('[data-view="menu"]').classList.replace('show', 'hide');
        // On ajoute les fruits sur le plateau de jeu
        fruits.forEach(fruit => {
            console.log('ping');
            gameView.querySelector('[data-view="gameBoard"]').appendChild(fruit);
        });        
        // On affiche le plateau de jeu
        gameView.classList.replace('hide', 'show');
    });
})
document.querySelector('[data-action="sendScore"]').addEventListener('submit', (el) => {
    el.preventDefault();
    gameLogic.sendScore([
        el.target.elements[0].value,
        el.target.elements[1].value,
    ]);
})


// Au chargement de la page, on affiche le bouton de demarrage du jeu
document.querySelector('[data-view="menu"]').classList.replace('hide', 'show');
// Affiche les score sur l'ecran de demarrage
gameLogic.displayScore(() => {

})


console.log(gameLogic);