$(document).ready(function() {
    $('#nav-learn').click(function() {
         var container = $(document.createElement('div'));
         container.addClass('learn-menu');
         $('main').append(container);







         // Why are you building this this way?
         // Eventually it should be a function to set the:
         // title
         // link
         // img

         // Construct things to learn
      
         
         container.append(getLearnable('JS'));
         container.append(getLearnable('iOS'));

    });

    var getLearnable = function(subjectTitle) {
         var learnable = $(document.createElement('div'));
         learnable.addClass('learnable');

         var imageContainer = $(document.createElement('div'));
         imageContainer.addClass('learnable-img');

         var actualImage = $(document.createElement('img'));
         actualImage.attr('src', 'http://placehold.it/125x125');

         
         // We only really need a title actually
         var textContainer = $(document.createElement('div'));
         var title = $(document.createElement('h1'));
         title.addClass('learnable-title');
         title.html(subjectTitle);
         textContainer.append(title);
         textContainer.css('height', '30%');
         textContainer.css('background-color', 'red');

         
         imageContainer.append(actualImage);
         learnable.append(imageContainer);
         learnable.append(textContainer);
         //container.append(learnable);

         return learnable;
    };
});