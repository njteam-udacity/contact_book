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
        });

        $("input#avatar").on("change", function (e){
            imageUploadHelper(e.target);
        })
            //Attach an avatar
            //Gather form data properties
            //TO DO MOVE FORM DATA Properties TO LOCAL STORAGE
            // TO DO Append thumbnail of the uploaded images 
            // above the browse button
            // Move contact list into a tabular display table layout
            // $(e.target).closest("li").remove();

        // $(window)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        //     });
    }

    /**
     * The imageUploadHelper function enables us to use upload image files and encode them in base64.
     * @param{string} references an img element to render thumbnail of the uploaded image.
     * */ 
        function imageUploadHelper (inputElem) {
            var inputElem = document.getElementById('avatar');
            var reader = new FileReader();
            var img = inputElem.files[0];
            var fileName = img.name; // not path
            var fileSize = img.size; // bytes
            var base64 = "";
            var result = "";

            // debugger;
            reader.addEventListener('loadend', function (){
                $("#thumbnail").removeAttr('src').attr("src", reader.result);
            }, false);
            
            reader.readAsDataURL(img);
            

        }

})(window.app, app.utils.checkForErrors);
