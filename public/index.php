<?php
    // Nous permet de charger plus facilement nos differentes classes dans le projet -> composer.json pour plus d'info -> PSR4
    require '../vendor/autoload.php';

    // On recupere le path de la requete, qui va permettre de savoir ce que le navigateur veut comme info

    if(isset($_REQUEST['path'])) {
        // On sépare deja en deux categorie, les appels avec et sans /api/
        $pathDetail = explode('/', $_REQUEST['path']);

        if(count($pathDetail) == 2) {
            if($pathDetail[0] === 'api') {
                // On est dans un appel API
                switch ($pathDetail[1]) {
                    case 'sendScore':
                        // On pourrait sans doute l'optimiser
                        $controller = new Controller\GameController();
                        $controller->sendScore();
                    case 'displayScore':
                        $controller = new Controller\GameController();
                        $controller->displayScore();
                }
            }
        } else {
            // On est dans un appel classique ce qui nous permet de changer les vues
            switch ($pathDetail[0]) {
                case 'score':
                    // Idem pour optimisation
                    $controller = new Controller\MemoryController();
                    $controller->scoreView();
                    break;
                default:
                    $controller = new Controller\MemoryController();
                    $controller->view();
                    break;
            }
        }
    } else {
        // On affiche la page par defaut
        $controller = new Controller\MemoryController();
        $controller->view();
    }

    