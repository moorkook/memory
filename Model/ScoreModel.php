<?php

    namespace Model;
    
    /**
     * ScoreModel
     * Permet de gerer toute la logique de contact et d'interaction avec la BDD. On ne doit pas voir de SQL en dehors des classes models
     * Le fait que cette classe etende Model lui donne accés a toutes ses proprietées et ses méthodes non private
     */
class ScoreModel extends Model
{
    private $tableStructure;

    public function __construct()
    {
        // Permet d'executer le constructor de la classe parent, cad Model
        parent::__construct();
        $this->tableName = "scores";
        // Pas utilisé, mais pratique comme pense bete, et peut servir si on veut mettre en place une base d'ORM
        // https://fr.wikipedia.org/wiki/Mapping_objet-relationnel
        $this->tableStructure = [
            "pseudo" => 'string',
            "time" => 'int',
            "date" => 'date',
        ];
    }
        
    /**
     * insertOne
     * Permet d'inserer un nouveau score
     *
     * @param  Array $values
     * @return bool
     */
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
                
    /**
     * getAll
     * Permet de recuperer un tableau contenant les 5 derniers score, triés de maniere descendante
     *
     * @return Array
     */
    public function getAll()
    {
        // Recupere la liste de tout les scores, et le renvoit sous la forme d'un array
        return $this->connection->query("SELECT * from $this->tableName ORDER BY time DESC LIMIT 5")->fetchAll(\PDO::FETCH_ASSOC);
    }
}
