(function(app, chkErr) {

    $(initializeApplication);

    function initializeApplication() {

        app.services.getConfig(chkErr(function(config) {

            app.services.getTemplates(config.templates, chkErr(function(templates) {
                 
                app.templates = templates;

                app.services.getContent(config.content, chkErr(function(content) {

                    app.content = content;
                
                    app.utils.renderPage(app.templates.page_index, app.content);
                    
                    // TO DO move this method from about to navigation
                    app.about.addNavigationMod();
        
                }));
                
            }));

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
