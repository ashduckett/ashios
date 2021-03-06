/*
TODO LIST:

1. Strip out any CSS that should be in a CSS file.
2. Make the popup menu look nicer and allow for a disabled item state.
3. Reuse code for popup rather than creating a new one each time.

*/



// We need a controller
class SideMenu {
    constructor(element) {
        this.element = element
        this.menuNodeCollection = new MenuNodeCollection();
        this.view = new SideMenuView(element, this)
        let self = this

        this.menuNodeCollection.init(function() {
            self.view.draw(self.menuNodeCollection)
        });
    }

    // Not ideal...need to work this out
    addNode(node) {
        this.menuNodeCollection.addNode(node)
    }

    addNodeWithParent(node) {
        this.menuNodeCollection.addNodeWithParent(node)
    }
}

// We need a view
class SideMenuView {
    constructor(element, controller) {
        this.element = element
        this.dict = {}
        this.controller = controller
    }

    draw(model) {
        let self = this
        self.element.html('')
        self.element.addClass('side-menu');

        // You need to pass in the model root nodes
        let list = self.buildList(model.getRootNodes());
        self.element.append(list);

        // This should be reusing the same popup used for child elements
        this.element.contextmenu(function(e) {
             let popupMenu = new PopupMenu();
                
            let popupMenuItem = new PopupMenuItemModel("Add new root...", function() {
                let name = prompt("Root item name:");
                                
                // Make the save, then add the node to the model and then update the view
                $.post("../php/insertMenuNode.php", { caption: name, text: "2pm", parentId: null }, function(insertId) {
                    let newRootNode = new MenuNode(insertId, null, name, "Textttt", [])
                    self.controller.addNode(newRootNode)
                    
                    // This should probably just add the node to the view rather than redraw the whole thing
                    self.draw(self.controller.menuNodeCollection)
                });
            });
            popupMenu.addPopupMenuItem(popupMenuItem)

            popupMenu.show(e.clientX, e.clientY)
            // Switch off normal context menu
            return false;
        });
    }

    buildList(menuItemList) {

        let self = this
        // Initially we need a base ul
        var list = $(document.createElement('ul'));
        list.addClass('tree-menu-ul');

        menuItemList.forEach(function(element) {
            var listItem = $(document.createElement('li'));
            listItem.addClass('tree-menu-li');
            
            // Hide list items that have a parent initially, since we only want to see roots to begin with
            if(element.parentId !== null) {
                self.dict[element.parentId] = list;
                list.hide();   
            }

            var span = $(document.createElement('span'));
            span.text(element.caption);
            span.addClass('noselect');
            listItem.append(span);

            span.dblclick(function(e) {
                if(this === e.target && self.dict[element.id]) {
                    self.dict[element.id].toggle();
                }
            });

            span.click(function(e) {
                $('textarea').val(element.text);
                $('textarea').trigger("change");
            });

            span.contextmenu(function(e) {
                let popupMenu = new PopupMenu();
                
                let popupMenuItem = new PopupMenuItemModel("Add new root...", function() {
                    let name = prompt("Root item name:");
                                    
                    // Make the save, then add the node to the model and then update the view
                    $.post("../php/insertMenuNode.php", { caption: name, text: "2pm", parentId: null }, function(insertId) {
                        let newRootNode = new MenuNode(insertId, null, name, "Textttt", [])
                        self.controller.addNode(newRootNode)    
                        
                        // This should probably just add the node to the view rather than redraw the whole thing
                        self.draw(self.controller.menuNodeCollection)
                    });
                });

                let popupMenuItem2 = new PopupMenuItemModel("Add new child...", function() {
                    let name = prompt("Child item name:");
                    
                    $.post("../php/insertMenuNode.php", { caption: name, text: "2pm", parentId: element.id }, function(insertId) {
                        let newRootNode = new MenuNode(insertId, element.id, name, "Textttt", [])
                        
                        // Does this get added properly?
                        self.controller.addNodeWithParent(newRootNode)    
                        self.draw(self.controller.menuNodeCollection)
                    });

                });

                let popupMenuItem3 = new PopupMenuItemModel("Delete", function() {
                    $.post("../php/deleteNode.php", { id: element.id }, function() {
                        self.controller.menuNodeCollection.removeNodeAndChildren(element.id);
                        self.draw(self.controller.menuNodeCollection)
                    });
                });

                let popupMenuItem4 = new PopupMenuItemModel("Save Text", function() {
                    element.text = $('textarea').val();
                    console.log(element.text);
                    $.post("../php/updateNode.php", { id: element.id, parentId: element.parentId, caption: element.caption, text: element.text }, function() {
                    //    self.controller.menuNodeCollection.removeNodeAndChildren(element.id);
                    //    self.draw(self.controller.menuNodeCollection)
                    });
                });

                popupMenu.addPopupMenuItem(popupMenuItem)
                popupMenu.addPopupMenuItem(popupMenuItem2)
                popupMenu.addPopupMenuItem(popupMenuItem3)
                popupMenu.addPopupMenuItem(popupMenuItem4)
                popupMenu.show(e.clientX, e.clientY)

                return false;
            });

            if(element.submenuNodes.length > 0) {
                listItem.append(self.buildList(element.submenuNodes));
            }
            
            list.append(listItem);
        });
        return list;
    }
}

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

    // Remove the node if it has an id of id
    removeNodeAndChildren(id) {

        let nodeFound = this.getNodeById(id)


        if(nodeFound.parentId !== null) {
            let parentNode = this.getNodeById(nodeFound.parentId)
            parentNode.submenuNodes = parentNode.submenuNodes.filter(node => node.id !== id)
        } else {
            this.nodes = this.nodes.filter(node => node.id !== id)
        }
    }

    searchBranchForNode(id, startingElement) {
        if(startingElement.id === id) {
            return startingElement;
        } else if(startingElement.submenuNodes !== null) {
            let i
            let result = null

            for(i = 0; result == null && i < startingElement.submenuNodes.length; i++) {
                result = this.searchBranchForNode(id, startingElement.submenuNodes[i])
            }
            return result
        }
        return null
    }


    getNodeById(id) {
        let result = null

        // Start by getting all of the root nodes
        let rootNodes = this.getRootNodes()

        // Search through each of them:
        for(let node of rootNodes) {
            result = this.searchBranchForNode(id, node);

            if(result !== null) {
                return result;
            }
        }
        return result


    }

    // Adds the node regardless of parenting
    addNode(node) {
        this.nodes.push(node);
    }

    // Node must have a parent id attached
    addNodeWithParent(nodeWithParentId) {
        // Find the parent

        let parentNode = this.getNodeById(nodeWithParentId.parentId)

        // Add to it your node
        // Why would the parent node ever be null? 
        parentNode.submenuNodes.push(nodeWithParentId)

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

    init(callback) {
        let self = this
        $.get("../php/getAllMenuNodes.php", function(data) {
            self.readFromJSON(data);
            callback()
        });
    }
}