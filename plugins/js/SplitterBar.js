(function($) {

    // We should take in an argument for endDrag
    $.fn.SplitterBar = function() {
        $(this).css('display', 'flex');
        $(this).css('height', '100%');

        let leftSide = $(this).children('.left').first();
        let rightSide = $(this).children('.right').first();

        leftSide.css('background-color', 'red');
        leftSide.css('width', '20px');

        rightSide.css('background-color', 'yellow');
        rightSide.css('flex', '1');

        // Inject splitter bar
        let splitterBar = $(document.createElement('div'));
        splitterBar.css('background-color', 'black');
        splitterBar.css('width', '12px');
        splitterBar.css('cursor', 'col-resize');
        
        leftSide.after(splitterBar);
        
        let isDragging = false

        splitterBar.mousedown((event) => {
            isDragging = true
            return false;
        });

        splitterBar.mouseup((event) => {
            isDragging = false
            return false;
        });

        $(this).mousemove((event) => {
            if(isDragging) {
                let leftOfLeft = leftSide.position().left;
                leftSide.width(event.pageX - leftOfLeft - splitterBar.width() / 2);
            }
        });
    }
}(jQuery));


/*
    If this were from scratch:
        * I'd use the side menu plugin.
        * I'd create a new plugin for the editor/preview area.


*/