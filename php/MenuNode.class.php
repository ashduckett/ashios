<?php
    require_once "DBObject.class.php";
    require_once __DIR__ . '/../config.php';

    class MenuNode extends DataObject implements JsonSerializable{
        protected $data = array(
            "id" => "",
            "parentId" => "",
            "caption" => "",
            "text" => ""
        );

        // Insert the menu node into the db
        public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_MENU_NODE . "(parentId, caption, text) VALUES (:parentId, :caption, :text)";
     
            $st = $conn->prepare($sql);
            $st->bindValue(":parentId", $this->data["parentId"], PDO::PARAM_INT);
            $st->bindValue(":caption", $this->data["caption"], PDO::PARAM_STR);
            $st->bindValue(":text", $this->data["text"], PDO::PARAM_STR);
     
            try {
                $st->execute();
            } catch(PDOException $e) {
                die("Connection failed: " . $e->getMessage());
            }
     
            $lastInsertId = $conn->lastInsertId();

            DataObject::disconnect($conn);
            return $lastInsertId;
        }

        public static function getAll() {
            $conn = parent::connect();
            $sql = "SELECT * FROM " . TBL_MENU_NODE;
     
            try {
                $st = $conn->prepare($sql);
                $st->execute();

                $nodes = array();

                foreach($st->fetchAll() as $row) {
                    $nodes[] = new MenuNode($row);
                }
           
                parent::disconnect($conn);
                return $nodes;
            } catch(PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }
        }

        public static function deleteById($id) {
            $conn = parent::connect();
            $sql = "DELETE FROM " . TBL_MENU_NODE . " WHERE id = :id";
            $st = $conn->prepare($sql);
            $st->bindValue(":id", $id, PDO::PARAM_STR);
            $st->execute();
            DataObject::disconnect($conn);
        }

        public static function deleteNode($id) {
            $conn = parent::connect();

            try {
                $sql = "DELETE FROM " . TBL_MENU_NODE . " WHERE id = :id";
                $st = $conn->prepare($sql);
                $st->bindValue(":id", $id, PDO::PARAM_STR);            
                $st->execute();
            } catch(PDOException $e) {
                error_log($e->getMessage(), 3, 'errorlog.log');
            }

            DataObject::disconnect($conn);
        }

        public static function findByNodeId($id) {
            $conn = DataObject::connect();
            $sql = "SELECT * FROM " . TBL_MENU_NODE . " WHERE id = :id";
            $st = $conn->prepare($sql);
            $st->bindValue(":id", $id);
            $st->execute();
            $nodes = array();
                    
            foreach($st->fetchAll() as $row) {
                $nodes[] = new MenuNode($row);
            }
            parent::disconnect($conn);
            
            return $nodes[0];
       }

        public function JsonSerialize() {
            $vars = get_object_vars($this);
            return $vars;
        }


    }