class MenuNode {
    constructor(id, parentId, caption, text, submenuNodes) {
        this.id = id;
        this.parentId = parentId;
        this.caption = caption;
        this.text = text;
        this.submenuNodes = submenuNodes;
    }
}

class MenuNodeCollection {
    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    readFromJSON(json) {
    
        // Pull out an array
        let nodeCollection = JSON.parse(json).nodes;

        for (let item of nodeCollection) {
            let node = item.data;

            // Construct a new object for each item in the interpretted model and add it to the collection
            let newNode = new MenuNode(node.id, node.parentId, node.caption, node.text, null);
            this.addNode(newNode);
        }

        // Set up the children nodes on each of the parent nodes
        let rootNodes = this.getRootNodes();

        for(let node of rootNodes) {
            this.makeTree(node);    
        }
    }

    getRootNodes() {
        return this.nodes.filter(node => node.parentId === null);
    }

    // This is intended to be run on each of the root nodes.
    makeTree(rootNode) {
        let childrenNodes = this.nodes.filter(node => node.parentId === rootNode.id);
        rootNode.submenuNodes = childrenNodes;
        
        for(let node of childrenNodes) {
            this.makeTree(node);
        }
    }
}
//////////////////// end model


$(document).ready(function() {
    // First we want to load all menu nodes:
    let menuNodeCollection = new MenuNodeCollection();

    $.get("../php/getAllMenuNodes.php", function(data) {
        menuNodeCollection.readFromJSON(data);
    });

    // How about having a div called splitter
    $('#nav-learn').click(function() {
        // What we actually want to happen here is to populate the main element.

        // First a container
        let learnContainer = $(document.createElement('div'));
        learnContainer.css('background-color', 'red');
        learnContainer.css('width', '100%');
        learnContainer.css('height', '100%');
        learnContainer.css('display', 'flex');

        
        $('main').append(learnContainer);

        // To the container we want to append our side menu
        let sideMenu = $(document.createElement('div'));
        sideMenu.css('background-color', 'green');
        sideMenu.css('width', '100%');

        let left = $(document.createElement('div'));
        left.addClass('left');
        left.append(sideMenu);

        let right = $(document.createElement('div'));
        right.addClass('right');

        right.MarkdownEditor();

        learnContainer.append(left);
        learnContainer.append(right);
        learnContainer.SplitterBar();

        sideMenu.SideMenu(menuNodeCollection.getRootNodes())

    });
});