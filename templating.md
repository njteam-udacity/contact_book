# Templating
Guide on moving static html files into dynamic templates utilizing handlebars.
This DRY approach to creating html pages will help minimize the number of DOM api calls to interpolate text-to-template and reuse blocks of html code throughout an application.

## Resources: 
+ [http://handlebarsjs.com/](http://handlebarsjs.com/)
+ [An Introduction to Handlebars.js](https://www.youtube.com/watch?v=SPaw1ETzS2c)
+ [Html fragments](http://www.jafsoft.com/doco/tag_manual_3.html)
+ [handlebarsjs builtin_helpers](https://handlebarsjs.com/builtin_helpers.html)


### The steps below are instructions for integrating templates in our application.
1. Create an html fragment and save it under the templates folder with a file name appropriate to your template.
    - Example files:
      - template/header.html
      - template/footer.html
      - template/slideshow.html
      - template/navmenu.html

2. Replace any static html content with a handlebars tags.
    - example static html:
      ```
      <h1>Hello Team</h1>
      ```  
    - example html with handlebars tags for interpolation:
      ```
      <h1>{{team-greeting}}</h1>
      ```
3. Save content/text in the content.json file under the data folder.
   - example file data/greetings.json
      ```
        {
          "team-greeting": "Hello Team"
        }
      ```

4. That is pretty much our general work flow for templating. There are other helpers that we can use with handlebars such as 
"{{#each}}" an {{#if}} that can be very helpful in creating templates with a DRY approach. Checkout the reference ["handlebarsjs builtin_helpers"](#resources) above for details.

## How it all works
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
  
- Also, notice the two pairs of curly braces inside the html tags. They are handlebars tags used to signify a dynamic point in the template where Handlebars will insert some content.


Once you have the template, the next step is the interesting part; Call the **Handlebars compile** function to process the template *source*. **Handlebars compile**  returns a function that accepts a data object as its parameter.

```
<!-- We will use an javascript call to obtain the html text from the greeting.html file and assign that value to the "source" variable -->

var source = " <h1>{{greeting}}  {{name}}</h1>
            <p>{{message}} </p>";

var templateFunc = Handlebars.compile(source);
```

Now every time the template function gets called with data, the resulting interpolated string will be returned.

```
<!-- High level example of the "templateFunc" signature -->
  templateFunc = function (data) {
    return "<h1>" + data.greeting +  data.name + "</h1>\n" + "<p>" + data.message + "</p>";
}
```

Then we capture the return value *string* from "templateFunc" and append it to the body or any other element in the DOM view.

```
var result = templateFunction(dataObj);

document.body.appendChild(result);
```
