<?php

    namespace Controller;
    
    /**
     * MemoryController
     * gere la logique liée au vue du jeu de memory. On aurait tout a fait pu tout mettre dans GameController, mais ca permet de simuler une architectures plus interessante
     */
class MemoryController extends Controller
{
                
    /**
     * View
     * Renvoit la vue memory
     *
     * @return HTML
     */
    public function view()
    {
        // Charge le contenu d'un fichier et le renvoit au un navigateur.
        echo file_get_contents('../view/memory.html');
    }

    /**
     * View
     * Renvoit la vue score, qui ne sert a rien pour l'instant. Pourquoi ne pas tenter de la faire fonctionner en utilisant ce qu'on a ?
     *
     * @return HTML
     */
    public function scoreView()
    {
        echo file_get_contents('../view/score.html');
    }
}
