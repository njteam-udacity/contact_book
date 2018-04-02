# Templating
Guide on moving static html files into dynamic templates utilizing handlebars.
This DRY approach to creating html pages will help minimize the number of DOM api calls to interpolate text-to-template and reuse blocks of html code throughout an application.

## Resources: 
+ [http://handlebarsjs.com/](http://handlebarsjs.com/)
+ [An Introduction to Handlebars.js](https://www.youtube.com/watch?v=SPaw1ETzS2c)
+ [Html Fragments](http://www.jafsoft.com/doco/tag_manual_3.html)
+ [Handlebars Builtin Helpers](https://handlebarsjs.com/builtin_helpers.html)


### The steps below are instructions for integrating templates in our application.
1. Create an html fragment and save it under the templates folder with a file name appropriate to your template.
    - Example file names:
      - template/partial/header.html
      - template/partial/footer.html
      - template/greeting.html
      - template/navmenu.html

    -  *Tip*: If you are creating a partial (a component of a page) it should be      saved under the folder "template/partial" with the appropriate name.

2. Replace any static html content with handlebars tags.
    - example static html:
      ```
      <h1>Hello Team</h1>
      <p>Tomorrow we are invited out for tacos.</p>
      ```  
    - example html using handlebars tags for interpolation:
      ```
      <h1>{{greeting}} {{name}}</h1>
      <p>{{message}}</p>
      ```
    - *Tip*: Use handlebars escape tags {{{ escape tag }}} (three pairs of curly braces) if you intend for the output to be interpreted as html.

3. Save content as a json file under the content folder:
   - example file path: **content/en/greetings.json**
   - example JSON file:
      ```
        {
          "greeting": "Hello",
          "name": "Team",
          "message": "Tomorrow we are invited out for tacos."
        }
      ```
   -  *Tip*: If your content is for a partial it should be saved in global.json.

4. Register your template or partial and register your content.
    
    - Edit the config.json file to include your content and template file names.
      - Example **before** adding the "greeting" template file names:
        ```
        {
        "templates": ["welcome", "partials/footer", "partials/header"],
        "content" : ["global", "welcome"]
        }
        ```  
      - Example **after** adding the "greeting" template file names:
        ```
        {
        "templates": ["welcome", "partials/footer", "partials/header", "greeting"],
        "content" : ["global", "welcome", "greeting"]
        }
        ```
5. Lastly, save your css under the styles folder with a name appropriate to the template that you are working on.
    - example: **styles/greetings.css**

6. That is pretty much our general work flow for templating. There are other helpers that we can use with handlebars such as 
"{{#each}}" and {{#if}} that can be very helpful in creating templates with a DRY approach. Checkout the reference ["handlebarsjs builtin_helpers"](#resources) above for details.

## How it all works!
We created an html template of an html component or page and stored it in a separate file under the templates folder. (e.g: templates/greeting.html)

```greeting.html source
   <!-- Pre-compiled templates are often referred to as "source" in handlebars.js -->


   <h1>{{greeting}} {{name}}</h1>
   <p>{{message}} </p>

```

- Notice that our demo greeting.html template does not have an `<html>` or `<body>` parent element.
  This technique is intended so that we can dynamically append templates to the DOM during run-time.
  This demo template itself, is just a pair of header tags with a greeting inside followed by a pair of paragraph tags with a message inside.
  
- Also, notice the two pairs of curly braces inside the html tags. They are handlebars tags used to signify a dynamic point in the template where Handlebars will insert some content.


Once you have the template, the next step is the interesting part. We call the **Handlebars compile** function to process the template *source*. **Handlebars compile** returns a function that accepts a data object as its parameter.

```
<!--Sidenote: We use AJAX to obtain the html text from the greeting.html file and assign that html text to the "source" variable -->

var source = " <h1>{{greeting}}  {{user-details.name}}</h1>
            <p>{{message}} </p>";

var templateFunc = Handlebars.compile(source);
```


Now every time the template function gets called with data, an interpolated string will be returned.
- example content data: 
```
    {
     "greeting" : "Hello",
     "user-details" : {
                        "name"  : "Sharon",
                        "email" : "sharon@demo.com"
                       },
     "message" : "Your invited out for tacos tomorrow night."
    }
```
- example template function signature:

```
  templateFunc = function (data) {
    return "<h1>" + data.greeting +  data.user-details.name + "</h1>" + <hr/> + "<p>" + data.message + "</p>";
}
```

Then we capture the return value *string* from "templateFunc" and append it to the DOM body or any other element in the DOM view.

```
var result = templateFunction(dataObj);

document.body.appendChild(result);

```

Next, the example output to the DOM would be:
# Hello Team
Tomorrow we are invited out for tacos.
