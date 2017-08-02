<?php
    require_once 'MenuNode.class.php';

    $data = array(
        'parentId' => $_POST['parentId'] === '' ? null : $_POST['parentId'],
        'caption' => $_POST['caption'],
        'text' => $_POST['text']
    );

    $node = new MenuNode($data);

    echo($node->insert());
