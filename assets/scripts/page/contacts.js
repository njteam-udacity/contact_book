(function(app, chkErr) {

/**
 * Calls the initialize function when jQuery is loaded. 
 */    
    $(initializeApplication);

/**
 * This function gathers view dependencies(templates, contents)
 * then renders the page.
 */
    function initializeApplication() {

        app.services.getConfig(chkErr(function(config) {

            app.services.getTemplates(config.templates, chkErr(function(templates) {
                 
                app.templates = templates;

                app.services.getContent(config.content, chkErr(function(content) {

                    app.content = content;
                
                    app.utils.renderPage(app.templates.page_contacts, app.content);
                    addEventListeners();
                }));
                
            }));

        }));

    }

    /**
     * This function adds event listners to the contact page.
     */
    function addEventListeners(){
        //Todo add event listeners
        // $(document)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });
        $(document).on("click", '.delete, .add, .edit', function (e){
            
            var $target = $(e.target);
            
            if ($target.hasClass("add") || $target.parent("div").hasClass("add")) {
               console.log ($("form").serializeArray());
            }
            //Attach an avatar
            //Gather form data properties
            //TO DO MOVE FORM DATA Properties TO LOCAL STORAGE
            // TO DO Append thumbnail of the uploaded images 
            // above the browse button
            // Move contact list into a tabular display table layout
            // $(e.target).closest("li").remove();

        });
        // $(window)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });
    }

})(window.app, app.utils.checkForErrors);
