<?php

    namespace Model;

    class ScoreModel extends Model
    {
        private $tableStructure;

        public function __construct()
        {
            // Permet d'executer le constructor de la classe parent, cad Model
            parent::__construct();
            $this->tableName = "scores";
            $this->tableStructure = [
                "pseudo" => 'string',
                "time" => 'int',
                "date" => 'date',
            ];
        }

        public function insertOne(Array $values)
        {

            // On prepare notre requete pour eviter des problemes de QD
            $stmt = $this->connection->prepare("INSERT INTO $this->tableName (pseudo, time) VALUES (:pseudo, :time)");
            // On lie nos données a la requete
            $stmt->bindParam(':pseudo', $values['pseudo']);
            $stmt->bindParam(':time', $values['time']);
            // On l'éxecute
            $stmt->execute();
            // On renvoit true pour savoir que tout s'est bien passé
            return true;
        }
        public function getAll()
        {
            // Recupere la liste de tout les scores, et le renvoit sous la forme d'un array
            return $this->connection->query("SELECT * from $this->tableName ORDER BY time DESC LIMIT 5")->fetchAll(\PDO::FETCH_ASSOC);
        }
    }
    