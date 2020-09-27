<?php

    namespace Controller;

    class Controller
    {
                
        /**
         * checkRequestType
         * Permet de verifier que le type de requete est le bon.
         *
         * @param  String $type
         * @return bool
         */
        protected function checkRequestType(String $type) {
            if($_SERVER['REQUEST_METHOD'] === $type) {
                return true;
            } else {
                return false;
            }
        }
    }
    