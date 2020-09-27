<?php
    
    namespace Model;

    class Model
    {
        protected $tableName;
        // Dans une vraie application, on mettrait ces données dans un .env pour eviter qu'elles ne soient partagées dans Github
        protected $dbName = "game";
        protected $dbUser = "root";
        protected $dbPass = "root";

        protected $connection;

        public function __construct()
        {
            // On initialise la connexion a la base de donnée ici
            $this->connection = new \PDO("mysql:host=localhost;dbname=$this->dbName", $this->dbUser, $this->dbPass);
        }
    }
    