<?php
    error_log("before require\n", 3, 'errorlog.log');
    require_once 'MenuNode.class.php';
    error_log("after require\n", 3, 'errorlog.log');

    $data = array(
        'parentId' => $_POST['parentId'] === '' ? null : $_POST['parentId'],
        'caption' => $_POST['caption'],
        'text' => $_POST['text']
    );

    error_log($data['parentId'], 3, 'errorlog.log');

    error_log("data collected\n", 3, 'errorlog.log');

    $node = new MenuNode($data);
    error_log("new node created\n", 3, 'errorlog.log');
    echo($node->insert());
    error_log("insert run\n", 3, 'errorlog.log');