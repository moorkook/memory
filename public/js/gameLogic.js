// Cette classe contient toute la logique de notre jeu
class GameLogic
{
    // On declare les proprietés dont on va avoir besoin içi
    constructor() {
        this.openedFruits = [];
        this.progression = 0;
        this.fruitsNumber = 18;
        this.timer = 300;
        this.timerEvent;
        this.fruits = [];
    }
    init = (call) => {
        // genere une nouvelle grille
        this.createGrid();
        // Randomise le placement des fruits
        this.randomise();
        // Lance le décompte
        this.launchTimer();
        console.log('Game starting');
        call(this.fruits);
    }

    showFruit = (el) => {
        // On verifie si le fruit est deja affiché
        if(el.target.dataset.status === 'off') {
            // Cette modification permet d'eviter qu'on retourne trois images en même temps
            if(this.openedFruits.length < 2) {
                let img = document.createElement('img');
                img.src = "image/fruits/" + el.target.dataset.id + ".jpg";
                // On affiche le fruit selon son id
                el.target.appendChild(img);
                el.target.dataset.status = 'on';
                this.openedFruits.push(el.target);
                // Si il y a deux fruits affichés, on lance la verification
                if(this.openedFruits.length === 2) {
                    if(this.openedFruits[0].dataset.id === this.openedFruits[1].dataset.id) {
                        // On a trouvé les deux même fruits
                        this.openedFruits = [];
                        // On augmente le décompte de progression vers la victoire
                        this.progression ++;
                        // Ici on verifie si tout les fruits sont trouvés
                        if(this.progression === this.fruitsNumber) {
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
        const gameContainer = document.querySelector('[data-view="jeu"]');
        // On va generer le nombre de case de memory, donc le nombre de fruits * 2
        for (let index = 1; index <= this.fruitsNumber; index++) {
            let fruitOne = document.createElement("div");
            fruitOne.dataset.id = index;
            fruitOne.dataset.status = "off";
            fruitOne.dataset.el = "fruit";
            fruitOne.classList.add('flex_container');
            fruitOne.classList.add('both_center');
            fruitOne.onclick = (el) => {gameLogic.showFruit(el)};


            let fruitTwo = document.createElement("div");
            fruitTwo.dataset.id = index;
            fruitTwo.dataset.status = "off";
            fruitTwo.dataset.el = "fruit";
            fruitTwo.classList.add('flex_container');
            fruitTwo.classList.add('both_center');
            fruitTwo.onclick = (el) => {gameLogic.showFruit(el)};

            this.fruits.push(fruitOne, fruitTwo);
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
        clearInterval(this.timerEvent);
    }
    launchTimer = () => {
        document.querySelector('[data-el="timer"]').max = this.timer;
        // On lance une fonction qui va se lancer toutes les secondes jusqu'a la fin de la partie
        this.timerEvent = setInterval(() => {
            console.log(this.timer);
            document.querySelector('[data-el="timer"]').value = this.timer;
            if((this.timer - 1) >= 0) {
                this.timer --;
            } else {
                this.endGame();
                console.log('you loose');
                // Le jeu est fini, et on a perdu
            }
        }, 1000)
    }
    endGame = () => {
        this.stopTimer();
        // On verifie si on a trouvé toutes les paires de fruits. Si oui, on a gagné, si non, on a perdu
        if(this.progression === this.fruitsNumber) {
            alert('Victory');
            document.querySelector('[data-view="jeu"]').classList.replace('show', 'hide');
            document.querySelector('[data-view="score"]').classList.replace('hide', 'show');
            document.querySelector('[data-value="score"]').value = this.timer;
        } else {
            alert('Defeat');
            location.reload();
        }
    }
    sendScore = (values) => {

        var params = new URLSearchParams();
        params.append('pseudo', values[0]);
        params.append('time', values[1]);
        axios.post('/api/sendScore', params)
          .then(function (response) {
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    displayScore = () => {
        let scoresView = document.querySelector('[data-view="scores"]');
        axios.get('/api/displayScore')
          .then(function (response) {
            let scores = response.data;
            scores.forEach(score => {
                let scoreView = document.createElement("p");
                scoreView.innerHTML = `${score.pseudo} : ${score.time}`;
                scoresView.appendChild(scoreView);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}