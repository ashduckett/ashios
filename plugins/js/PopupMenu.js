// We need a controller

class PopupMenu {
    constructor(x, y) {
        this.model = new PopupMenuModel();
        this.view = new PopupMenuView();
    }

    addPopupMenuItem(item) {
        this.model.addPopupMenuItem(item)
    }

    show(x, y) {


        this.view.draw(this.model, x, y)
    }
}

// We need a view
class PopupMenuView {
    constructor() {

    }

    draw(model, x, y) {
        let popupContainer = $(document.createElement('div'))
        popupContainer.height(100);
        popupContainer.width(150);
        popupContainer.css('position', 'absolute')
        popupContainer.css('left', x)
        popupContainer.css('top', y)
        popupContainer.css('background-color', 'rgb(242, 242, 242')
        popupContainer.css('border', '1px solid rgb(204, 204, 204)')
        popupContainer.css('font-family', 'arial,sans-serif')

        popupContainer.addClass('mnuPopupNodeContext');

        let list = $(document.createElement('ul'))
        list.css('list-style', 'none')
        list.css('padding', '0')
        list.css('margin', '0')
        list.addClass('noselect')
        list.css('cursor', 'default')
        for(let item of model.popupMenuItems) {

            let listItem = $(document.createElement('li'))
            listItem.addClass('popup-list-item')
            listItem.text(item.caption)
            
            listItem.click(function() {
                item.callback()
            })
            
            
            list.append(listItem)
        }

        popupContainer.append(list)

        $('body').find('.mnuPopupNodeContext').remove();
        $('body').append(popupContainer);

        $('body').click(function(event) {
            if(event.which === 1) {
                $('body').find('.mnuPopupNodeContext').remove();
            }
        });

    }
}



// We need a model
class PopupMenuModel {
    constructor() {
        this.popupMenuItems = [];
    }

    addPopupMenuItem(item) {
        this.popupMenuItems.push(new PopupMenuItemModel(item.caption, item.callback))
    }
}

class PopupMenuItemModel {
    constructor(caption, callback) {
        this.caption = caption
        this.callback = callback
    }
}



//let popupMenu = new PopupMenu();




