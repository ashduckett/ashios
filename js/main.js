$(document).ready(function() {
    $('#nav-learn').click(function() {
         var container = $(document.createElement('div'));
         container.addClass('learn-menu');
         
         
         container.addClass('center-v');
        // container.height(100);
        // container.width(100);
      //   container.css('background-color', 'red');
      //   container.css('margin', 'auto');
         $('main').append(container);
    });
});