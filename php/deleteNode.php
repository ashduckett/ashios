<?php
    require_once 'MenuNode.class.php';
    

    // We also want to delete all of the children
    $id = $_POST['id'];
    error_log('before delete code', 3, 'errorlog.log');
    
    $node = MenuNode::findByNodeId($id);
    error_log('findByNodeId run', 3, 'errorlog.log');

    $parentId = $node->getValue('parentId');
    error_log('parentId found: ' + $parentId, 3, 'errorlog.log');

    MenuNode::deleteNodeWithChildren($id, $parentId);
    error_log('after delete code', 3, 'errorlog.log');
