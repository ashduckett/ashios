let Editor = function(element, preview) {
    this.element = element;
    this.preview = preview;
    this.textArea = $(document.createElement('textarea')); 
};

Editor.prototype.draw = function() {
    let editor = $(document.createElement('div'));
    editor.css('height', '100%');
    editor.css('width', '100%');
    editor.css('background-color', 'white');
  
    // Editor needs somewhere to edit
    //let textArea = $(document.createElement('textarea'));
    this.textArea.css('resize', 'none');
    this.textArea.css('border', 'none');
    this.textArea.css('box-shadow', 'none');
    this.textArea.css('outline', 'none');
    this.textArea.css('width', '100%');
    this.textArea.css('height', '100%');
    this.textArea.css('display', 'block');
    this.textArea.css('font-family', '"Ubuntu Mono", Monaco');
    this.textArea.css('font-size', '14px');



    let self = this;

    this.textArea.keyup(function(event) {
        // For now I won't do the parsing myself, I'll steal someone else's parser
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        var text      = self.textArea.val();
        var html      = converter.makeHtml(text);


        self.preview.previewPane.html(html);



        /*
            So we now have line breaks being added.
            In dillinger.io, one line is a br, two is a paragraph. Makes sense. How do we make it happen?
            I think we're going to have to parse the entire text.

            If we find two brs, make it a paragrah.

            Iterate over all of the text.

            A piece of text with nothing in front of it, or a double-br should be a paragraph.
            A piece of text with a single br in front of it should keep that br.

            Replace two brs and the text that follows them with a paragraph. This should contain any single brs inside.
            Replace the first bit of text with a paragraph.


        
            So what is not a paragraph?
                Something that begins with a hash and then a space if there are between one and six hashes.
                A piece of text with a matching number of underlining equals or dash signs.

        
        
        
        
            Different elements:
            Outside of paragraphs:    
                Headers start with between 1 and 6 hash symbols and then a space. You can also do it by underlining. Which is a pain.

                Lists always begin with a number, a dot and then a space, or
                an asterisk and then a space.

                If it doesn't start with a list symbol or a numeric with a dot


                Headers, Lists, Tables

        */

    });


    editor.append(this.textArea);
    this.element.append(editor);
};



Editor.prototype.getText = function() {
    return this.textArea.val();
};


let Preview = function(element) {
    this.element = element;
    this.previewPane = $(document.createElement('div'));
};

Preview.prototype.draw = function() {
    
    this.previewPane.css('height', '100%');
    this.previewPane.css('width', '100%');
    this.previewPane.css('background-color', 'white');
    this.previewPane.css('font-family: Georgia, Cambria, serif');
    
    this.element.append(this.previewPane);
};



// We need to write a markdown parser. It should:
    // Handle normal text
    // Handle headers 1 to 6
    // Handle ordered and unordered lists
    // Handle quotes
    // Handle links
    // Handle inline code
    // Handle block code
    // Handle images

    

/*
 Ultimately we want a function we can pass a string. And the string
 be converted into HTML.

 Normal text: Find out the font and the font size.
 Paragraphs are formed with two carriage returns.

 Start by taking the text and converting it to the html for preview
 using the correct font size and font.

 Then do headers.




 STEP 1:
    Get a text area into the editor pane.
    Set its font
 */








(function($) {

    // We should take in an argument for endDrag
    $.fn.MarkdownEditor = function() {
        console.log('Markdown editor');
        // We know we're in a div, so let's splitter bar it.
        let editor = $(document.createElement('div'));

        let left = $(document.createElement('div'));
        left.addClass('left');
        left.append(editor);

        let right = $(document.createElement('div'));
        right.addClass('right');
        



        $(this).append(left);
        $(this).append(right);



        let editorPreview = new Preview(right);
        editorPreview.draw();

        let editorView = new Editor(left, editorPreview);
        editorView.draw();

        $(this).SplitterBar();
    }
}(jQuery));

// Need to stop the bar on the right being moved by the bar
// on the left. That is the next job.