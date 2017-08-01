// We need a controller
class SideMenu {
    
}



(function($) {
    $.fn.SideMenu = function(menuItems) {
        var dict = {};
        let self = this;

        let popupMenu = new PopupMenu();

        let popupMenuItem = new PopupMenuItemModel("Main 1", function() {
            let name = prompt("Root item name:");
        });

        popupMenu.addPopupMenuItem(popupMenuItem)


        // I think this could be a plugin.
        // The plugin would be a $.popup() plugin
        // That took in instances of PopupMenuItem
        // Each PopupMenuItem would have its own callback
        this.contextmenu(function(event) {
            popupMenu.show(event.clientX, event.clientY)
            return false;
        });

        this.addClass('side-menu');
        this.css('background-color', 'rgb(90, 95, 112)');
        this.css('color', 'white');

        var list = buildList(menuItems);

        this.append(list);

        function buildList(menuItemList) {

            // Initially we need a base ul
            var list = $(document.createElement('ul'));
            list.addClass('tree-menu-ul');

            menuItemList.forEach(function(element) {
                var listItem = $(document.createElement('li'));
                listItem.addClass('tree-menu-li');
                
                // Hide list items that have a parent initially, since we only want to see roots to begin with
                if(element.parentId !== null) {
                    dict[element.parentId] = list;
                    list.hide();   
                }

                var span = $(document.createElement('span'));
                span.text(element.caption);
                span.addClass('noselect');
                listItem.append(span);

                span.dblclick(function(e) {
                    if(this === e.target && dict[element.id]) {
                        dict[element.id].toggle();
                    }
                });

                // I need access to the model here. Do I have it?
                span.contextmenu(function(e) {
                    console.log('you have context menued ' + element.caption)
                    let popupMenu = new PopupMenu();
                    let popupMenuItem = new PopupMenuItemModel("Add new root...", function() {
                        let name = prompt("Root item name:");
                    });

                    let popupMenuItem2 = new PopupMenuItemModel("Add new child...", function() {
                        let name = prompt("Child item name:");
                    });

                    popupMenu.addPopupMenuItem(popupMenuItem)
                    popupMenu.addPopupMenuItem(popupMenuItem2)
                    popupMenu.show(e.clientX, e.clientY)

                    event.stopPropagation()
                    event.preventDefault()
                    return false;
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