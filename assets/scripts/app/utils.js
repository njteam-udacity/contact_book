(function(app) {

    app.utils = {

        displayContent: function (targetId){
            $(targetId).css("display, block");
        },

        hideContent: function (targetId){
            $(targetId).css("display, none");
        },

        appendToElement: function (target, content){

            var $targetElm = $(target);
        
            if ($targetElm.length > 0) {
                $targetElm.append(content);
            }
            else {
                console.error("Could not find" + target + "!");
            }

        },

        /**
         * Utilize handlebars templating to bind an html template with 
         * content data, then used jQuery to render the page view.
         * template represent the template function, data represents the data object that
         * will be bound to the template.
         * @param {string} html fragment/template.
         * @param {object} Object containing content data. 
         */
        renderPage: function (template, data) {       
            $(document.body).append(template(data));
            this.refreshHash();  
        },

        /**
         * This function will refresh the page to target any hash links eg. #about
         * Since we are using templating, the page will not have all of its elements loading into the DOM
         * rightaway. It is only after a few async calls, http services etc, and after page components
         * are readied and loaded into the page. Only then should we fetch/target anchor tags/ hash links.
         * 
         */
        refreshHash: function () {
            var hash = location.hash;
                location.hash = "";
                location.hash = hash;
        },
        /**
         * Delimiter
         */
        swapChars: function(strSource, from, to) {
            return strSource.split(from).join(to);
        },

        /**
         * 
         * @param {stringmap} key value pairs of raw JSON texts.
         */
        parseJSONTexts: function(txtMap) {

            var objMap = {};
    
            for (var property in txtMap) {
                var name = app.utils.swapChars(property, "/", "_");
                objMap[name] = JSON.parse(txtMap[property]);
            }

            return objMap;
            

        },

        imageUploadHelper: function () {
            let elm = document.getElementById('avatar');
            let img = elm.files[0];
            let fileName = img.name; // not path
            let fileSize = img.size; // bytes
            let reader = new FileReader();
            
            reader.addEventListener('loadend', function (){
                let base64 = btoa(binary);
            }, false);
            reader.readAsBinaryString(img);
            
            $("img").first().attr("src", "data:image/jpeg;base64," + base64);

        },

        checkForErrors: function(cb) {

            return function(error, result) {

                // if there is an error
                if (error) {
                    // deal with the error
                    $(document.documentElement).addClass('error');
                    $(document.body).empty().text(error.message);
                    console.error(error);
                    // and exit.
                    return;
                }

                cb(result);

            }

        }
         
    };

})(window.app = window.app || {});