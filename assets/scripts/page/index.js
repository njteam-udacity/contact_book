(function(app, chkErr) {

    $(initializeApplication);

    function initializeApplication() {

        app.utils.getPageResources(chkErr(function(templates, content, config) {

            // app.templates = templates;
            // app.content = content;
                
            app.utils.renderPage(/*app.*/templates.page_index, /*app.*/content);
            
        }));

    }

    
    function addEventListeners(){
        //Todo add event listeners
        // $(document)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });
    
        // $(window)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });
    }

})(window.app, app.utils.checkForErrors);
