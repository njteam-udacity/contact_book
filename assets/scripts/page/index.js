/**
 * This IIFE function (module pattern) privately contains our page specific source code.
 * Short reference on module patterns: http://adripofjavascript.com/blog/drips/understanding-the-module-pattern-in-javascript.html.
 * @param{app} is the global object shared across the application, passed to our function as an argument.
 * @param{chkErr} is our error handling function that is called before async requests. 
 */
(function(app, chkErr) {
     
    /**
    * Calls the initialize function when jQuery is loaded. 
    */    
    $(initializeApplication);

   /**  
    * This function gathers VIEW dependencies for this page(templates, contents)
    * then renders the page.
    */
    function initializeApplication() {

        app.utils.getPageResources(chkErr(function(templates, content, config) {
                
            app.utils.renderPage(templates.page_index, content);
            
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
