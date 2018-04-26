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
         * This function gathers view dependencies(templates, contents)
         * then renders the page.
         */
        getPageResources: function(callback) {

            app.services.getConfig(function(error, config) {

                if (error) { return callback(error); }

                app.services.getTemplates(config.templates, function(error, templates) {
                    
                    if (error) { return callback(error); }

                    app.services.getContent(config.content, function(error, content) {

                        if (error) { return callback(error); }
                        
                        // everything went well
                        callback(/*error*/null, templates, content, config);

                    });
                    
                });

            });

        },

        identifyPageRootElement: function() {
                        // get the page path without query or fragment
                        // and extract the name form it
            var pageName = app.utils.resolveNameFromPath(location.pathname);
            app.utils.getPageRootElement().attr( "id", pageName);

        },

        getPageRootElement: function() {
            return $(document.body);
        },

         
        resolveNameFromPath: function(path) {
            return app.utils.getNameFromPath(path, "index");
        },

        getNameFromPath: function(path, ifEmpty) {

            return path
                // paths always satrt with / so remove the first character
                .substring(1)
                // split any potential additional path segments (e.g. about/us becomes ["about", "us"])
                .split('/')
                // get the last path segment
                .pop()
                // remove potential .html from that last path segment (e.g about.html becomes about)
                .replace('.html', '') || 
                // if the result was empty, that means we were in the index page. it was empty
                // because the index page can be referred to as just "/", which we dropped at .substring(1)
                ifEmpty;
            
        },

        /**
         * This function gathers all html input elements of type file. It then inspects and gathers
         * all files uploaded to each input type file.   
         * @param {HTMLform element} Html element of type form.
         * @return {Array} containing data files stored in input elements.
         * reference = https://gist.github.com/oswaldoacauan/7580474
         * */
        getFormFiles : function($form) {
            var form = $form,
                datafiles = [];
            
            $.each(form.find('input[type="file"]'), function(i, tag) {
                 
                if(tag.files) {
                    $.each(tag.files, function(i, file) {
                     datafiles.push(file);
                    });
                }

            });
            
            return datafiles;
        },

        /**
         * Utilize handlebars templating to bind an html template with 
         * content data, then used jQuery to render the page view.
         * template represent the template function, data represents the data object that
         * will be bound to the template.
         * @param {string} template fragment/template.
         * @param {object} content containing content data. 
         */
        renderPage: function (template, content) {
            app.utils.getPageRootElement().append(template(content));
            app.utils.refreshHash();
            app.utils.identifyPageRootElement();
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
         
        // This function handles any async service request errors
        /**
         * @param {Function cb}
         */
        checkForErrors: function(cb) {

            return function(error/*, ...rest*/) {

                // if there is an error
                if (error) {
                    // deal with the error
                    $(document.documentElement).addClass('error');
                    $(document.body).empty().text(error.message);
                    console.error(error);
                    // and exit.
                    return;
                }

                // convert the arguments object to an array
                var args = Array.prototype.slice.call(arguments, 0);
                // loose the first argument (which was the error)
                // since it has already been dealt with above
                args.shift();
                // finally, call the callback, passing it the
                // rest of the arguments
                cb.apply(this, args);

            }

        }
         
    };

})(window.app = window.app || {});