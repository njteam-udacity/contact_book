(function(app) {

    $(initializeApplication);

    function initializeApplication() {

        app.services.getConfig(function(error, config) {

             // if there is an error
             if (error) {
                // deal with the error
                console.error(error);
                // and exit.
                return;
            }
            
            app.services.getTemplates(config.templates, function(error, templates) {
                 
                // if there is an error
                if (error) {
                    // deal with the error
                    console.error(error);
                    // and exit.
                    return;
                }

                app.templates = templates;


                app.services.getContent(config.content, function(error, content) {

                    // if there is an error
                    if (error) {
                        // deal with the error
                        console.error(error);
                        // and exit.
                        return;
                    }
        
                    app.content = content;
                
                    app.utils.renderPage(app.templates.page_index, app.content);
        
                });
                
            });

        });

    }

    
    function addEventListeners(){

        // $(document)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });

        // $(window)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });
    }

})(window.app);
