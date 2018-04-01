# templating
Guide on moving static html files into dynamic templates utilizing handlebars.
This DRY approach to creating html pages will help to solve making multi DOM calls with javasript and
will also help reduce the number of DOM api calls to interpolate context.

## To start
Create an html template ( below) of an html component or page and store it in a separate file under the templates folder. (e.g: templates/greeting.html)

```demo.html source
   <!-- Pre-compiled templates are often referred to as "source" in handlebars.js -->


   <h1>{{greeting}} {{name}}</h1>
   <p>{{message}} </p>

```

- Notice that our demo greeting.html template (below) does not have an `<html>` or `<body>` parent element.
  This technique is intended so that we can dynamically append templates to the DOM body during run-time and change views after
  handlebars interpolates. (merge the content with the template)
  This demo template itself, is just a pair of header tags with a greeting inside followed by a pair of paragraph tags with a message inside.
  
- Also, notice the three pairs of curly braces inside the html tags. They are handlebars tags used to signify a dynamic point in the template where Handlebars will insert some content.


Once you have the template, the next step is the interesting part; **Handlebars compile** function will process the template *source* and will return a function that accepts a data object as its parameter.

```
<!-- We will use an javascript call to obtain the html from the greeting.html file and assign that value to the source variable -->

var src = " <h1>{{greeting}} {{name}}</h1>
            <p>{{message}} </p>";

```

Its is important to capture that the 