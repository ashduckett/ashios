$(document).ready(function() {
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

        sideMenu.SideMenu(function(id) {

        });


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