<?php
    require_once 'MenuNode.class.php';
    $nodes = MenuNode::getAll();

    error_log(print_r($nodes, true), 3, 'errorlog.log');

    error_log(json_encode(array('nodes' => $nodes)), 3, 'errorlog.log');
    echo json_encode(array('nodes' => $nodes));