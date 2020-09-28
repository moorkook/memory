<?php
    
    namespace Model;
    
    /**
     * Model
     * Classe parente qui gere toutes les actions communes aux Models
     * 
     */
    class Model
    {
        // Je crée des proprietées qui seront heritées par les enfants
        // public = accessible quel que soit le contexte
        // protected = accessible dans le contexte de la classe ou de ses enfants
        // private = accesdible uniquement dans le contexte de la classe
        protected $tableName;
        // Dans une vraie application, on mettrait ces données dans un .env pour eviter qu'elles ne soient partagées dans Github
        protected $dbName = "game";
        protected $dbUser = "root";
        protected $dbPass = "root";

        protected $connection;
        
        /**
         * __construct
         * Methode magique aui s'execute a chaque instanciation de la classe Model
         * @return void
         */
        public function __construct()
        {
            // On initialise la connexion a la base de donnée ici
            // https://www.php.net/manual/fr/book.pdo.php
            $this->connection = new \PDO("mysql:host=localhost;dbname=$this->dbName", $this->dbUser, $this->dbPass);
        }
    }
    