(function (app) {

    app.services = {

        /** 
         * Gathers data needed for the website
         * @param {string}  basePath path to templates folder. Must end with a 
         *                  forward slash character (/)
         * @param {string}  extension string file type.
         * @param {string[]}  filenames of file names.
         * @param {function} "callback" handler function   
         */
        getTexts: function(basePath, extension, filenames, callback) {
            
            var contentMap = {}, //object containing all of the templates
                i = 0; //iterator

            function loop(name) {

                i += 1;

                var filepath = basePath + name + extension;

                app.services.ajaxRequest("GET", filepath, function(e) {

                    if (e.target.status !== 200) {
                        next(new Error('Could not load the file "' +
                            filepath + '" from the server!'));
                        return;
                    }

                    contentMap[name] = e.target.responseText;
                    next(/*There is no error to pass here*/null);
                    
                });

            }

            function next(error) {
                
                if (error) {
                    callback(error);
                    return;
                }

                if (i < filenames.length) {
                    loop(filenames[i]);
                } else {
                    callback(/*There is no error to pass here*/null, contentMap);
                }
                
            }

            next(/*There is no error to pass here*/null);

        },

        getTemplates: function(filespecs, cb) {

            app.services.getTexts("/templates/", ".html", filespecs, function(error, fileContents) {
                 
                // if there is an error
                if (error) {
                    // deal with the error
                    cd(error);
                    // and exit.
                    return;
                }

                var templates = {};

                for (var filename in fileContents) {
                    
                    // textFileContent variable represent a layout 
                    //or partial "source" in templates.
                    var textFileContent = fileContents[filename];
                    var name = app.utils.swapChars(filename, "/", "_");
                    
                    // templateFunction is the pre-compiled generated
                    //template function returned from Handlebars.
                    var templateFunction = Handlebars.compile(textFileContent); 

                    // templates[filename] stores template functions in the 
                    // shared variable "templates" in order to be called through out the application.
                    templates[name] = templateFunction;

                    //while we are at it. If source is a partial we will register
                    //that partial in handlebars as well. 
                    if (filename.indexOf("partials/") === 0) {
                        Handlebars.registerPartial(name, textFileContent);
                    }

                }

                cb(null, templates);

                
            });

        },

        getConfig: function (cb) {
            $.getJSON('/config.json', function(config) {
                cb(null, config);
            }).fail(cb);
        },

        getContent: function (filespecs, cb){
            
            app.services.getTexts("/content/en/", ".json", filespecs, function(error, data) {

                // if there is an error
                if (error) {
                    // deal with the error
                    cb(error);
                    // and exit.
                    return;
                }
    
                var content = app.utils.parseJSONTexts(data);
            
                cb(null, content);
    
            });
        },

        ajaxRequest: function(method, url, callback) {

            var xhr = new XMLHttpRequest();
    
            xhr.addEventListener('load', callback);
            xhr.open(method, url);
            xhr.send();
    
        }

    };


})(window.app = window.app || {});