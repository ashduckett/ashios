-- For tables we will need a Node

/*
    This can store everything about all nodes

    MenuNode
        * id -- primary key
        * parentId -- null if root
        * caption



*/

CREATE TABLE MenuNode (
    id int NOT NULL AUTO_INCREMENT,
    parentId int,
    caption varchar(255),
    text longtext,
    PRIMARY KEY (id)
);