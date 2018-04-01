# templating
Guide on moving static html files into dynamic templates utilizing handlebars.
This DRY approach to creating html pages will help to solve making multi DOM calls with javasript and
will also help reduce the number of DOM api calls to interpolate changes in context.

## To start
Create an html segment of the html document(template), such as the welcome.html component and store it in
a separate file under the templates folder. (e.g: templates/welcome.html)

- Notice that our welcome.html template (below) does not have an <html> or <body> parent element.
  This technique is intended to dynamically append templates to the DOM body during run-time and change views after
  handlebars interpolates (merges the content with the template).
