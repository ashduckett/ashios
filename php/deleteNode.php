<?php
    require_once 'MenuNode.class.php';

    $id = $_POST['id'];
    MenuNode::deleteNode($id);