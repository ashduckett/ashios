<?php
    require_once 'MenuNode.class.php';
    $nodes = MenuNode::getAll();

    echo json_encode(array('nodes' => $nodes));