<?php

    namespace Controller;

    use Model\ScoreModel as ScoreModel;

    class GameController extends Controller
    {
        public function displayScore() {
            if($this->checkRequestType('GET')) {
                header('Content-Type: application/json');
                $scores = new ScoreModel();
                $result = $scores->getAll();
                echo json_encode($result);
            }

        }

        public function sendScore() {
            // On verifie qu'on est bien sur une requete POST
            if($this->checkRequestType('POST')) {
                // Permet de dire qu'on renvoit du JSON, ce qui facilite le travail en aval
                header('Content-Type: application/json');
                // Si on reçoit les données attendues
                if(($_POST['time'] !== "" && $_POST['pseudo'] !== "") && (isset($_POST['time']) && isset($_POST['pseudo']))) {
                    // Instanciation du model qui va permettre d'inserer notre score dans la BDD
                    $newScore = new ScoreModel();
                    $result = $newScore->insertOne($_POST);
                    if($result === true) {
                        echo json_encode([
                            "message" => "score inserted"
                        ]);
                    } else {
                        echo json_encode([
                            "message" => "An error occured while inserting the new score"
                        ]);
                    }
                } else {
                    echo json_encode([
                        "message" => "pseudo and time were not found in the request body"
                    ]);
                }
            }
        }
    }