// Cette classe contient toute la logique de notre jeu
class GameLogic
{
    // On declare les proprietés dont on va avoir besoin içi
    constructor() {
        this.openedFruits = [];
        this.fruits = [];

        this.timerEvent;

        this.progression = 0;
        this.fruitsNumber = 18;
        this.timer = 300;
    }

    init = (call) => {
        // genere une nouvelle grille
        this.createGrid();
        // Randomise le placement des fruits
        this.randomise();
        // Lance le décompte
        this.launchTimer();
        console.log('Game starting');
        // C'est une callback, ce qui permet d'execution une function defini par le contexte appelant apres l'execution de la fonction.
        // Attention, ca ne marche pas en cas de tache asynchrone
        call(this.fruits);
    }

    showFruit = (el) => {
        // On verifie si le fruit est caché
        if(el.target.dataset.status === 'off') {
            // Cette modification permet d'eviter qu'on retourne trois images en même temps
            if(this.openedFruits.length < 2) {
                // On crée un element HTML img
                let img = document.createElement('img');
                img.src = "image/fruits/" + el.target.dataset.id + ".jpg";

                // On affiche le fruit selon son id
                el.target.appendChild(img);
                el.target.dataset.status = 'on';

                // On l'ajoute a la proprieté openedFruits
                this.openedFruits.push(el.target);
                // Si il y a deux fruits affichés, on lance la verification
                if(this.openedFruits.length === 2) {
                    if(this.openedFruits[0].dataset.id === this.openedFruits[1].dataset.id) {
                        // On a trouvé les deux même fruits, donc on remet a zero le compteur de carte ouverte
                        this.openedFruits = [];
                        // On augmente le décompte de progression vers la victoire
                        this.progression ++;
                        // Ici on verifie si tout les fruits sont trouvés
                        if(this.progression === this.fruitsNumber) {
                            // On lance la fin du jeu
                            this.endGame();
                        }
                    } else {
                        // On attends une demi seconde avant de cacher les fruits
                        setTimeout(() => {
                            // On cache les fruits et remet a zero le compteur de fruits ouverts
                            this.openedFruits[0].dataset.status = 'off';
                            this.openedFruits[1].dataset.status = 'off';

                            this.openedFruits[0].innerHTML = '';
                            this.openedFruits[1].innerHTML = '';

                            this.openedFruits = [];    
                        }, 500);
                        
                    }
                }
            }
        }
    }

    createGrid = () => {
        // Une constante ne peut pas etre modifiée quand elle a été declarée
        const gameContainer = document.querySelector('[data-view="jeu"]');

        // On va generer le nombre de case de memory, donc le nombre de fruits * 2
        // Astuce, si tu change la proprieté fruitsNumber, tu change le nombre de case. Fait juste attention a voir assez d'images.
        for (let index = 1; index <= this.fruitsNumber; index++) {

            // Créer deux fruits differents permet d'eviter que le push ecrase le premier avec le second
            let firstFruit = document.createElement("div");
            firstFruit.dataset.id = index;
            firstFruit.dataset.status = "off";
            firstFruit.dataset.el = "fruit";
            firstFruit.classList.add('flex_container');
            firstFruit.classList.add('both_center');
            firstFruit.onclick = (el) => {gameLogic.showFruit(el)};


            let secondFruit = document.createElement("div");
            secondFruit.dataset.id = index;
            secondFruit.dataset.status = "off";
            secondFruit.dataset.el = "fruit";
            secondFruit.classList.add('flex_container');
            secondFruit.classList.add('both_center');
            secondFruit.onclick = (el) => {gameLogic.showFruit(el)};

            this.fruits.push(firstFruit, secondFruit);
        }
    }

    randomise = () => {

        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

        // On prepare nos variables
        let currentIndex = this.fruits.length;
        let temporaryValue;
        let randomIndex;

        // Cett boucle tourne jusqu'a ce qu'on ai epuisé toute les cases
        while (currentIndex !== 0) {

            // On choisit un element au hasard
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Et on l'échange avec l'élément courant
            temporaryValue = this.fruits[currentIndex];
            this.fruits[currentIndex] = this.fruits[randomIndex];
            this.fruits[randomIndex] = temporaryValue;
        }
    }

    stopTimer = () => {
        // Permet juste d'arreter le decompte de temps
        clearInterval(this.timerEvent);
    }

    launchTimer = () => {
        document.querySelector('[data-el="timer"]').max = this.timer;
        // On lance une fonction qui va se lancer toutes les secondes jusqu'a la fin de la partie
        this.timerEvent = setInterval(() => {
            console.log(this.timer);
            // On met a jour le timer. C'est la qu'un framework comme React est utile, car il eviterait de devoir modifier le DOM
            document.querySelector('[data-el="timer"]').value = this.timer;
            if((this.timer - 1) >= 0) {
                this.timer --;
            } else {
                // Le jeu est fini, et on a perdu
                this.endGame();
            }
        }, 1000)
    }

    endGame = () => {
        this.stopTimer();
        // On verifie si on a trouvé toutes les paires de fruits. Si oui, on a gagné, si non, on a perdu
        if(this.progression === this.fruitsNumber) {
            alert('Tu a gagné !');
            document.querySelector('[data-view="jeu"]').classList.replace('show', 'hide');
            document.querySelector('[data-view="score"]').classList.replace('hide', 'show');
            document.querySelector('[data-value="score"]').value = this.timer;
        } else {
            alert('Tu a perdu ...');
            // Méthode simple pour relancer une partie
            location.reload();
        }
    }

    sendScore = (values) => {

        // On prepare un appel ajax en utilisant la librairie Axios.
        // On pourrait aussi le faire en JS vanilla
        // https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/Utiliser_XMLHttpRequest
        var params = new URLSearchParams();
        params.append('pseudo', values[0]);
        params.append('time', values[1]);
        
        // C'est une requete POST avec des elements dans son body
        axios.post('/api/sendScore', params)
          .then(function (response) {
            location.reload();
          })
          .catch(function (error) {
            // Il faudrait sans doute ajouter une gestion des erreurs, non ?
            console.log(error);
          });
    }

    displayScore = () => {
        let scoresView = document.querySelector('[data-view="scores"]');

        // C'est une requete GET
        axios.get('/api/displayScore')
          .then(function (response) {
            let scores = response.data;
            scores.forEach(score => {
                let scoreView = document.createElement("p");
                // Cette syntaxe est tres interessante pour afficher des variables avec des strings
                // score.pseudo + ' : ' + score.time est une alternative
                scoreView.innerHTML = `${score.pseudo} : ${score.time}`;
                scoresView.appendChild(scoreView);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}