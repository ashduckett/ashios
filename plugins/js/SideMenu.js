var currentId = 0;

var TreeMenu = function() {
    this.menuItems = [];
};

TreeMenu.prototype.addMenuItem = function(treeMenuItem) {
    this.menuItems.push(treeMenuItem);
};

TreeMenu.prototype.getMenuItems = function() {
    return this.menuItems;
};

var TreeMenuItem = function(caption, url) {
    this.caption = caption;
    this.url = url;
    this.children = [];
    this.id = currentId++;
    this.parentId = null;
};

TreeMenuItem.prototype.addChild = function(childMenuItem) {
    childMenuItem.parentId = this.id;
    this.children.push(childMenuItem);
    return childMenuItem;
};

TreeMenuItem.prototype.addChildren = function(childrenMenuItems) {
    for(var i = 0; i < childrenMenuItems.length; i++) {
        childrenMenuItems[i].parentId = this.id;
        this.children.push(childrenMenuItems[i]);
    }
};

TreeMenuItem.prototype.hasChildren = function() {
    return this.children.length > 0;
}

TreeMenuItem.prototype.getChildren = function() {
    return this.children;
};


var fullModel = [
    {
        caption: "Swift",
        link: "",
        subMenuItems: [
            {
                caption: "Variables and Constants",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Comments",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Numeric Types",
                link: "submenu link",
                subMenuItems: []
            }
        ]
    }, {
        caption: "Core Data",
        link: "",
        subMenuItems: [
            {
                caption: "The Quick Solution",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Subclassing NSManagedObject",
                link: "submenu link",
                subMenuItems: []
            }
        ]
    },
    {
        caption: "Animation",
        link: "",
        subMenuItems: [
            {
                caption: "Loops",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Functions",
                link: "submenu link",
                subMenuItems: []
            }
        ]
    }
];

(function($) {
    $.fn.SideMenu = function(menuItems) {

        console.log('SideMenu called');
        console.log(menuItems);
        var dict = {};

        this.addClass('side-menu');
        this.css('background-color', 'rgb(90, 95, 112)');
        this.css('color', 'white');

        // Build up the model from the JSON
        var treeMenu = new TreeMenu();
      //  var menuItems = [];

        /*var makeList = function(json) {
            var menuItems = [];

            json.forEach(function(element) {
                var menuItem = new TreeMenuItem(element.caption, element.link);    

                if(element.subMenuItems.length > 0) {
                    menuItem.addChildren(makeList(element.subMenuItems));
                }
                menuItems.push(menuItem);
            });
          
            return menuItems;
        };*/

        //treeMenu.menuItems = makeList(fullModel);

        console.log('outside')
        console.log(menuItems)
        var list = buildList(menuItems);

        this.append(list);

        function buildList(menuItemList) {
            console.log('inside buildList');
            console.log(menuItemList)
            // Initially we need a base ul
            var list = $(document.createElement('ul'));
            list.addClass('tree-menu-ul');

            menuItemList.forEach(function(element) {
                console.log(element)

                var listItem = $(document.createElement('li'));
                listItem.addClass('tree-menu-li');
                
                // Hide list items that have a parent initially, since we only want to see roots to begin with
                if(element.parentId !== null) {
                    dict[element.parentId] = list;
                    list.hide();   
                }

                var span = $(document.createElement('span'));
                span.text(element.caption);

                // Need a way to identify each menu item
               // var id = currentId;

               // if(id == null) {
                //    id = element.caption;
                    
               // } else {
                //    id = id + '-' + element.caption;
                //}

                //span.attr('id', id);
                span.addClass('noselect');
                listItem.append(span);

                if(element.parentId !== null) {
                    
                }
                console.log(dict);

              /*  span.click(function(e) {
                    callback(id);
                });*/

                // How can I get hold of the list? The sublist?
                span.dblclick(function(e) {
                    console.log('double clicked');
                    console.log(element.id);

                    if(this === e.target && dict[element.id]) {
                        console.log('HIT')
                        console.log(dict[element.id]);
                        
                        dict[element.id].toggle();
                    }
                });

                if(element.submenuNodes.length > 0) {
                    listItem.append(buildList(element.submenuNodes));
                }
                
                list.append(listItem);
            });
            return list;
        }
    };
})(jQuery);


/*

    Call a method, which you pass in to the plugin's function call.
    Pass in a callback method with an argument.
    When the function is called, pass something back identifying...is it going to be too complicated?
    
    Identify each menu item with rootMenuName-subMenuName-subMenuName etc.





    We want to make the entire menu customisable which means all of its
    titles need to come from a database.




*/