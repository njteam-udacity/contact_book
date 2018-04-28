/**
 * This IIFE function (module pattern) privately contains our page specific source code.
 * Short reference on module patterns: http://adripofjavascript.com/blog/drips/understanding-the-module-pattern-in-javascript.html.
 * @param {object} is the global object shared across the application, passed to our function as an argument.
 * @param {Function} is our error handling function that is called before async requests. 
 */
(function(app, chkErr) {

    var contacts = [] //stores contact entries.
    var listTemplate; //stores the list partial

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
                 
            app.storage.getData(chkErr(function(data) { 
                listTpl = templates.partials_contact_details;
                content.contacts = data;
                app.utils.renderPage(templates.page_contacts, content);
                addContactPageListeners();
            }));

        }));

    }

    /**
     * This function adds event listners to the contact page.
     */
    function addContactPageListeners(){
        
        $(document).on("click", ".add, .edit, .delete", function (e) {

            var $target = $(e.target);
            
            if ($target.hasClass("add") || $target.parent("button").hasClass("add")) {
                $target.toggleClass("active");
                $(".contacts form").toggleClass("hidden");
            }

            if ($target.hasClass("delete") || $target.parent("button").hasClass("delete")) {
                
                if (confirm("Are you sure that you want to delete this contact?")) {
                    removeContactFromStorage($target.closest("li").data("name"));
                    $target.closest("li").remove();

                }
                
            }


        });
        //form values and files submit to local webstorage
        $("form").on("submit", function (e){
            e.preventDefault();

            var formEntry = $(this).serializeArray();
            
            addContactToStorage(formEntry);
            
            // createNewListItem("list", formEntry);

            //reset the form
            this.reset();
            setFormThumbnail("/assets/images/profile.png");

        });

        //Input type file event listener
        $("input#avatar").on("change", function (e){
            imageUploadHelper(e.target);
        });
        
        // $(window)
        //     // does something when ".selector" is clicked.
        //     .on('click', '.selector', function() {

        // });
    }

    /**
     * Handles user errors. Provides a way to communicate with the user.
     * TO DO add a nicer overlay to communicate errors.
     *@param {string} text that communicates error.  
     * */
    function broacastError(message) {
        alert(message);
    }

    /**
     * This function provides preview of an image as a thumbnail.
     * It captures an instance of the image loaded from html input type file.
     * If an image is not provided then we will insert a default image as a thumbnail. 
     * @param {string} representing url path of the image
     */
    function setFormThumbnail(url){
        $("#thumbnail").attr("src", url);
        $("input[name='avatarSource']").val(url)
    }

    /**
     * This function determines whether an image file is supported.
     * @param {*} imgFile 
     * @returns {Boolean} True if supported, false otherwise.
     */
    function canHandleImage(imgFile) {

        if (isTooBig(imgFile.size)) {
            broacastError("Image too big");
            return false;
        }
        
        if (isTooSmall(imgFile.size)) {
            broacastError("Image too small");
            return false;
        }

        if (!hasSupportedExtension(imgFile.name)) {    
            broacastError("Image type is not supported");
            return false;
        }
        
        return true;

    }

    /**
     * The imageUploadHelper function tests upload image files.
     * If the image file pass criteria then the function will encode the image in base64.
     * Then an preview of the image will be placed in the view as a thumbnail and
     * the dataUrl will be stored in a designated form input element.
     * Otherwise this function will notify the user the reason why that image file could not be loaded.
     * 
     * @param {object} HTMLInputElement references an input element of type file.
     * */ 
    function imageUploadHelper(inputElem) {
       

        if (!inputElem.value) {
            // set the placeholder image back
            setFormThumbnail("/assets/images/profile.png");
            // we're done here
            return;

        }
        
        if (window.FileReader) {
            
            var imgFile = inputElem.files[0];
            
            // handle errors
            if (!canHandleImage(imgFile)) {
                // bad image, we're done here
                return;
            }
            
            var reader = new FileReader();

            reader.addEventListener('loadend', function() {
                setFormThumbnail(reader.result);
            }, false);

            reader.addEventListener('error', function() {
                broacastError("Can't upload image!");
            }, false);

            reader.readAsDataURL(imgFile);

        }
        else {
            broacastError("Image upload is not supported in this browser");
        }

    }
    
    /**
     * This function stores a list of contacts into local storage
     * @param {array} arrOfContacts 
     */
    function setContactsInStorage (contactList){
        app.storage.setData(contactList, chkErr(function () {

            //To do make an overlay to display this message. 
            return "success";

        }));
    }
    /**
     * This function gets a list of contacts out of local storage to analyze and 
     * aggregates the contact list when a new entry is added.
     * 
     * @param {array} contact details 
     */
    function addContactToStorage(contact) {
        var status = "";
        app.storage.getData(chkErr(function(data) {
                
            if (data.length > 0) {

                for (var i = 0; i < data.length; i++ ) {

                    contacts.push(data[i]);
                }   

            }
            contacts.push(contact);    
            status =  setContactsInStorage(contacts);
            if (status = "success") {

                // $(".rolodex ul.list").prepend(listTemplate(contact));
                alert("Contact Saved");
            }
        }));
    }
    
    /**
     * This function gets a list of contacts out of local storage to analyze and 
     * will remove a contact from the list.
     * 
     * @param {array} contactDetails
     */
    function removeContactFromStorage(contact) {
        
        app.storage.getData(chkErr(function(data) {
         
        var updatedList = [];
            $(data).each(function(i, item){
                
                if(Array.isArray(item)) {

                    if(item[2].value !== contact) {
    
                        updatedList.push(item);
                    }
                }   
            });

            status = setContactsInStorage(updatedList);
            //TO DO create a status broadcaster since this code is repeated.
            if (status = "success") {
                alert("Contact list updated");
            }
        
        }));
    }

    /**
     * This function tests whether an image file type is acceptible.'
     * This function maybe replaced when using layer of checking in the input 
     * element's attribute: accept="image/*". It allows the browser to validate
     * the file.
     * @param {string} filepath
     * @returns {boolean} 
     */
    function hasSupportedExtension(path) {
        return /\.(jpe?g|png|gif)$/i.test(path);
    }

    /**
     * This function tests whether an file size is too small.
     * @param {string} filepath
     * @returns {boolean} 
     */
    function isTooSmall(size) {
        return size < 1000;
    }

    /**
     * This function tests whether an file size is too large.
     * Note: We have 5 mb to spare with local storage.
     * Since we are storing upto 100kb  per image that means we can
     * store less than 50 images in local storage.
     * @param {string} filepath
     * @returns {boolean} 
     */
    function isTooBig(size) {
        return size > 100700
    }

    /**
     * TO DO Fix this function to output the list template.git 
     * This function makes an xml request to get a list template. It take a content object
     * and outputs a new contact list item.
     * @param {string} partialName 
     * @param {function} callback
     * @returns {string} htmlfragment
     */
    function createNewListItem(partialName, content){
        var listTpl = app.services.getPartial(chkErr(function (partialName, content){
            
            return listTpl(content);
        }));
    };

            // Move contact list into a tabular display table layout
            //TO DO MOVE FORM DATA Properties TO LOCAL STORAGE
            // delete $(e.target).closest("li").remove();


})(window.app, app.utils.checkForErrors);
