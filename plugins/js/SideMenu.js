(function($) {
    $.fn.SideMenu = function(menuItems) {
        var dict = {};

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
                console.log(element)
                if(element.submenuNodes.length > 0) {
                    listItem.append(buildList(element.submenuNodes));
                }
                
                list.append(listItem);
            });
            return list;
        }
    };
})(jQuery);