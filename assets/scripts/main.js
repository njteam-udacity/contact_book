function initializeApplication() {

    var templates = {}, //An object that will contain all of our html templates.
        content = {} //An object that will contain our content.

    getData("../templates/", ".html", ["welcome", "slideshow"], function (tpls) {
        templates = tpls;

        getData("../data/", ".json", ["content", "contacts"], function (data) {
            content = parseJSON(data);
            renderLandingPage(templates, content);
        });

    })
}

function renderLandingPage(templates, data) {

    $("body").html(templates.welcome);
    $(".title").html(data.content.application.title);

}

/** 
 * Function that gathers data needed for the website
 * @param {string}  url path to templates folder
 * @param {string}  dataType string file type.
 * @param {array}   array of strings (template names)
 * @param {function} "callback" handler function   
 */
function getData(url, dataType, array, callback) {

    var contentMap = {}, //object containing all of the templates
        i = 0; //iterator

    function loop(name) {
        i += 1;

        ajaxRequest("GET", url + name + dataType, function (e) {

            contentMap[name] = e.target.status === 200 ? e.target.responseText : null;
            next();
        })

    }

    function next() {
        if (array) {
            try {
                if (i < array.length) {
                    loop(array[i]);
                } else {
                    callback(contentMap);
                }
            } catch (error) {
                console.error(error);
            }
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

$(document).ready(function () {

    initializeApplication();
});