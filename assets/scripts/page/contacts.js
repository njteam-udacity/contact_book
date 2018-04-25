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
        
        $(document).on("click", ".add, .edit, .delete", function (e) {

            var $target = $(e.target);
            
            if ($target.hasClass("add") || $target.parent("button").hasClass("add")) {
                $target.toggleClass("active");
                $(".contacts form").toggleClass("hidden");
            }

        });
        
        $("form").on("submit", function (e){
            e.preventDefault();
        });
        
        $("input#avatar").on("change", function (e){
            imageUploadHelper(e.target);
        })
        
        // Use a switch statement for edit, delete  e,target.value instead of
        //classname. 

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

        if (window.FileReader) {
            
            var imgFile = inputElem.files[0];
            
            var reader = validateFile(imgFile);
            

            try {

                if (reader != null) {

                reader.addEventListener('loadend', function (){
                $("#thumbnail").removeAttr('src').attr("src", reader.result);
                }, false);

                reader.readAsDataURL(imgFile);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        else {
            alert("Image upload is not supported in this browser");
        }
    }
    

    /**
     * This function will validate image files uploaded with the following criteria:
     * File size is great then 1 kb
     * File size under 1 mb
     * File type is .gif, .jpg, .jpeg, or .png
     * 
     * @param {object} type HTMLInputElement type file.  
     * @returns{object|null} if criteria is meet then returns new windows.FileReader.
     */
    function validateFile (file) {

        try {
                // Make sure `fileName` matches our extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            // Make sure `filesize` matches our size criteria.
                if (file.size > 1000 && file.size < 100700) {

                    return new FileReader();

                }
                else {

                    alert("Please make sure your image is bigger then 1kb and less than 1mb");
                    return null;
                }
            }
            else {

                alert("Upload one of the supported file types:.gif, .jpg, .jpeg, .png");
                return null;

            }
        }            
        catch(error) { //log error.
            console.error(error);
        }
        
    }  
             
            // Move contact list into a tabular display table layout
            //TO DO MOVE FORM DATA Properties TO LOCAL STORAGE
            // delete $(e.target).closest("li").remove();


})(window.app, app.utils.checkForErrors);
