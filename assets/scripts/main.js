// (function () {
     /**
     * @type {[key: string]: object}
     */
    var templates; //An object that will contain all of our template functions.

    /**
     * @type {[key: string]: object}
     */
    var content; //An object that will contain our content.

    function initializeApplication() {

        $.getJSON('/config.json', function (config) {
            
            getText("/templates/", ".html", config.templates, function(error, fileContents) {
                 
                // if there is an error
                if (error) {
                    // deal with the error
                    console.error(error);
                    // and exit.
                    return;
                }

                templates = {};

                for (var filename in fileContents) {
                    
                    // textFileContent variable represent a layout 
                    //or partial "source" in templates.
                    var textFileContent = fileContents[filename];
                    
                    // templateFunction is the pre-compiled generated
                    //template function returned from Handlebars.
                    var templateFunction = Handlebars.compile(textFileContent); 

                    // templates[filename] stores template functions in the 
                    // shared variable "templates" in order to be called through out the application.
                    templates[filename] = templateFunction;

                    //while we are at it. If source is a partial we will register
                    //that partial in handlebars as well. 
                    if (filename.indexOf("partials/") === 0) {
                        Handlebars.registerPartial(filename, textFileContent);
                    }

                }

                getText("/content/en/", ".json", config.content, function(error, data) {

                    // if there is an error
                    if (error) {
                        // deal with the error
                        console.error(error);
                        // and exit.
                        return;
                    }
        
                    content = parseJSON(data);
                
                    renderPage(templates, content);
        
                });
                
            });

        });


    }

    /**
     * Utilize handlebars templating to bind an html template with 
     * content data, then used jQuery to render the page view.
     * @param {string} html fragment/template
     * @param {object} Object containing content data. 
     */

    function renderPage(templates, data) {
        
        $("body").append(templates.welcome(data));
      
    }

    /** 
     * Gathers data needed for the website
     * @param {string}  basePath path to templates folder. Must end with a 
     *                  forward slash character (/)
     * @param {string}  extension string file type.
     * @param {string[]}  filenames of file names.
     * @param {function} "callback" handler function   
     */
    function getText(basePath, extension, filenames, callback) {
        
        var contentMap = {}, //object containing all of the templates
            i = 0; //iterator

        function loop(name) {

            i += 1;

            var filepath = basePath + name + extension;

            ajaxRequest("GET", filepath, function(e) {

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

    }

    function ajaxRequest(method, url, callback) {

        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', callback);
        xhr.open(method, url);
        xhr.send();

    }

    function parseJSON(dataObj) {
        var parsedData = {};

        try {
            for (var property in dataObj) {
                parsedData[property] = typeof (dataObj[property]) === "string" ?
                    JSON.parse(dataObj[property]) : null;
            }
            return parsedData;
        } catch (error) {
            console.error(error);
        }
    }

    $(document).ready(function () {
        
        initializeApplication();
    });

// });