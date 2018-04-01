# templating
Guide on moving static html files into dynamic templates utilizing handlebars.
This DRY approach to creating html pages will help to solve making multi DOM calls with javasript and
will also help reduce the number of DOM api calls to interpolate context.

Resources: 
+ [http://handlebarsjs.com/](http://handlebarsjs.com/)
+ [An Introduction to Handlebars.js](https://www.youtube.com/watch?v=SPaw1ETzS2c)

## To start
Create an html template (example below) of an html component or page and store it in a separate file under the templates folder. (e.g: templates/greeting.html)

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


Once you have the template, the next step is the interesting part; Call the **Handlebars compile** function to process the template *source*. **Handlebars compile**  returns a function that accepts a data object as its parameter.

```
<!-- We will use an javascript call to obtain the html text from the greeting.html file and assign that value to the "source" variable -->

var source = " <h1>{{greeting}} + " " + {{name}}</h1>
            <p>{{message}} </p>";

var templateFunc = Handlebars.compile(source);
```

Now every time the template function gets called with data, the resulting interpolated string will be returned.

```
<!-- High level example of the "templateFunc" signature -->
  templateFunc = function (data) {
    return "<h1>" + data.greeting + " " + data.name + "</h1>\n" + "<p>" + data.message + "</p>";
}
```

Then we capture the return value *string* from "templateFunc" and append it to the body or any other element in the DOM view.

```
var result = templateFunction(dataObj);

document.body.appendChild(result);
```