
//////////////////// end model


$(document).ready(function() {

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

        let sideMenuController = new SideMenu(sideMenu)

//        sideMenu.SideMenu(menuNodeCollection.getRootNodes())

    });
});