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

(function($) {

    // We should take in an argument for endDrag
    $.fn.MarkdownEditor = function() {
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