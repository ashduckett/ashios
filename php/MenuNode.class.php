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
            $sql = "INSERT INTO " . TBL_MENU_NODE . "(parentId, caption) VALUES (:parentId, :caption)";
            $st = $conn->prepare($sql);
            $st->bindValue(":parentId", $this->data["parentId"], PDO::PARAM_INT);
            $st->bindValue(":caption", $this->data["caption"], PDO::PARAM_STR);
            $st->execute();
            $lastInsertId = $conn->lastInsertId();
            DataObject::disconnect($conn);
            return $lastInsertId;
        }
    

        public static function getAll() {
            error_log('started function call getAll', 3, 'errorlog.log');
            $conn = parent::connect();
            error_log('connected', 3, 'errorlog.log');
            $sql = "SELECT * FROM " . TBL_MENU_NODE;
            error_log('sql formed', 3, 'errorlog.log');

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

        public function JsonSerialize() {
            $vars = get_object_vars($this);
            return $vars;
        }

    //     public static function findByProjectId($project_id) {
    //         $conn = DataObject::connect();
    //         $sql = "SELECT * FROM " . TBL_SCHEDULING_PROJECT . " WHERE id = :project_id";
    //         $st = $conn->prepare($sql);
    //         $st->bindValue(":project_id", $project_id);
    //         $st->execute();
    //         $projects = array();
                    
    //         foreach($st->fetchAll() as $row) {
    //             $projects[] = new SchedulingProject($row);
    //         }
    //         parent::disconnect($conn);
            
    //         return $projects[0];
    //    }

    //     public function getShoutCount() {
    //         $conn = DataObject::connect();
    //         $sql = "SELECT COUNT(id) FROM " . TBL_SHOUT . " WHERE project_id = :project_id";
    //         $st = $conn->prepare($sql);
    //         $st->bindValue(":project_id", $this->getValue('id'), PDO::PARAM_INT);
    //         $st->execute();
    //         $count = $st->fetchColumn();
    //         parent::disconnect($conn);
    //         return $count;
    //     }

    //     public static function deleteById($id) {
    //         $conn = parent::connect();
    //         $sql = "DELETE FROM " . TBL_SCHEDULING_PROJECT . " WHERE id = :id";
    //         $st = $conn->prepare($sql);
    //         $st->bindValue(":id", $id, PDO::PARAM_STR);
    //         $st->execute();
    //         DataObject::disconnect($conn);
    //     }
    
    //     public function JsonSerialize() {
    //         $vars = get_object_vars($this);
    //         return $vars;
    //     }

    //     // This method will assume that the id is correct and update
    //     public function update() {
    //         try {
    //             $conn = parent::connect();
    //             $sql = 'UPDATE ' . TBL_SCHEDULING_PROJECT . ' SET name = :name WHERE id = :id';
    //             $st = $conn->prepare($sql);
    //             $st->bindValue(':name', $this->getValue('name'), PDO::PARAM_STR);
    //             $st->bindValue(':id', $this->getValue('id'), PDO::PARAM_INT);
    //             $st->execute();
    //             DataObject::disconnect($conn);
    //         } catch(Exception $e) {
    //             error_log($e->getMessage(), 3, 'error_log.log');
    //         }
    //     }
    }
