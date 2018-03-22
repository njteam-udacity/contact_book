function initializeApplication() {

    var templates = {}, //An object that will contain all of our html templates.
        content = {} //An object that will contain our content.

    getText("../templates/", ".html", ["welcome", "footer", "header"], function(error, tpls) {

        if (error) return console.log(error);

        templates = tpls;

        getText("../data/", ".json", ["content", "contacts"], checkForError(function(data) {
            content = parseJSON(data);
            
            renderPage(templates.header, content);
            renderPage(templates.welcome, content);
            renderPage(templates.footer, content);
        }));

    })
}

/**
 * Utilize handlebars templating to bind an html template with 
 * content data, then used jQuery to render the page view.
 * @param {string} html fragment/template
 * @param {object} Object containing content data. 
 */

function renderPage(source, data) {

    var template = Handlebars.compile(source);
    var html = template(data.content);

    $("body").append(html);

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
                return next(new Error('Could not load the file "' +
                    filepath + '" from the server!'));
            }

            contentMap[name] = e.target.responseText;
            next();
            
        });

    }

    function next(error) {
        
        if (error) {
            return callback(error);
        }

        if (i < filenames.length) {
            loop(filenames[i]);
        } else {
            callback(null, contentMap);
        }
        
    }

    next();

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

function checkForError(callback) {

    return function(possibleError, expectedValue) {

        if (possibleError) {
            return console.error(possibleError);
        }

        callback(expectedValue);

    }

}

$(document).ready(function () {

    initializeApplication();
});