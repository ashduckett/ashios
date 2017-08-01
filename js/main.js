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
    }

    getRootNodes() {
        return this.nodes.filter(node => node.parentId === null);
    }

}

$(document).ready(function() {
    // First we want to load all menu nodes:
    let menuNodeCollection = new MenuNodeCollection();

    function makeTree(menuNode) {
        // We have an item, which is a root. First grab its children:
        let childrenNodes = menuNodeCollection.nodes.filter(node => node.parentId === menuNode.id);

        // Now set these to be on the menuNode's subitems array
        menuNode.submenuNodes = childrenNodes;

        // Now call this same function for all the children nodes

        for(let node of childrenNodes) {
            makeTree(node);
        }
    }

    $.get("../php/getAllMenuNodes.php", function(data) {
        menuNodeCollection.readFromJSON(data);
        let rootNodes = menuNodeCollection.getRootNodes();
        console.log(rootNodes);

        // Improve this later. For now we have our tree
        for(let item of rootNodes) {
            makeTree(item);
        }
    });








    // Your plugin doesn't cater for entirely dynamically loaded data

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


        // Now we want to create a plugin and call it on
        // the right side so that it can be our editor/preview
        // area. It doesn't have to be a plugin but I'm rather
        // carried away with such things.
        







        // Data needs to be loaded here, but after login

        sideMenu.SideMenu(menuNodeCollection.getRootNodes())


        //$("main").load("../pages/learn.html", function() {

            // Set up the side menu
           /* $('.side-menu').SideMenu(function(id) {
               // console.log(id);
            
                if(id === "Swift-Variables and Constants") {
                    $('.page').load("../learning/Variables.html");
                }
                

            });*/

            //$('.splitter').SplitterBar();
            //$('.right-splitter').SplitterBar();
        //});
    });
});