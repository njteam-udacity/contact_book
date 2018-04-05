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
         * @param {string} html fragment/template
         * @param {object} Object containing content data. 
         */
        renderPage: function (template, data) {       
            $(document.body).append(template(data));      
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
            

        }
         
    };

})(window.app = window.app || {});