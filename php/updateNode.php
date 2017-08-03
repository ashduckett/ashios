<?php
    require_once 'MenuNode.class.php';

    $data = array(
        'id' => $_POST['id'],
        'parentId' => $_POST['parentId'] === '' ? null : $_POST['parentId'],
        'caption' => $_POST['caption'],
        'text' => $_POST['text']
    );

    $node = new MenuNode($data);

    $node->update();