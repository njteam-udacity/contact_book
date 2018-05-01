# Templating
Guide on moving static html files into dynamic templates utilizing handlebars.
This DRY approach to creating html pages will help minimize the number of DOM api calls to interpolate text-to-template and reuse blocks of html code throughout the application.

## Resources: 
+ [http://handlebarsjs.com/](http://handlebarsjs.com/)
+ [An Introduction to Handlebars.js](https://www.youtube.com/watch?v=SPaw1ETzS2c)
+ [Html Fragments](http://www.jafsoft.com/doco/tag_manual_3.html)
+ [Handlebars Builtin Helpers](https://handlebarsjs.com/builtin_helpers.html)


### The steps below are instructions for integrating templates in our application.
1. Create an html fragment and save it under the templates folder with a file name appropriate to your template and the extension "hbs".
    - Example file names:
      - template/partial/header.hbs
      - template/partial/footer.hbs
      - template/page/greeting.hbs
      - template/partial/navmenu.hbs

    -  *Tip*: If you are creating a partial (a component of a page) it should be  saved under the folder "template/partial" with the appropriate name.

2. Save content as a json file under the content/en/page folder:
   - Example file path: **content/en/greetings.json**
   - Example JSON file:
      ```
        {
          "salutation": "Hello",
          "name": "Team",
          "message": "Tomorrow we are invited out for tacos."
          "img-url": "http://greeting.io"
          "img-text": "Some description"
        }
      ```
   -  *Tip*: If your content is for partial will shared globally in the application it should be saved in the shared folder.

3. Replace any static content with handlebars tags.
    - Example static content:
      ```
      <h1>Hello Team</h1>
      <p>Tomorrow we are invited out for tacos.</p>
      ```  
    - Example using handlebars tags for interpolation. The proper syntax is to use **dot notation** to obtain key values.

      ```
      <h1>{{page_greeting.salutation}} {{page_greeting.name}}</h1>
      <p>{{page_greeting.message}}</p>
      ```
    - *Tip*: Use handlebars escape tags {{{ escape tag }}} (three pairs of curly braces) if you intend for the output to be interpreted as html.
    - *Tip*: For html attribute values, wrap handlebars tags in quotes "{{attribute}}" like so:
       - `<img href="{{page_greeting.img-url}}" alt="{{page_greeting.alt-text}}">`

4. Register your template or partial and register your content.
    
    - Edit the config.json file to include your content and template file names.
      - Example **before** adding the "greeting" template file names:
        ```
        {
        "templates": ["page/index","partials/footer", "partials/header"],
        "content" : ["global", "page/index"]
        }
        ```  
      - Example **after** adding the "greeting" template file names:
        ```
        {
        "templates": ["page/index", "partials/footer", "partials/header", "page/greeting"],
        "content" : ["global", "page/index", "page/greeting"]
        }
        ```
        
5. **If** and only if you are creating a **new page**, then we need to create or         modify the script file for that page because the template will be loaded into        the page **body** dynamically with jQuery.
    - First we need to **wrap** an IIFE around any *page specific* code that you may have and then add the module initializer code as such:
         ```
         (function (param, param2) { // immediately invoked function expression.
            
            "some initialize page script code blocks"

            'some greeting page script code blocks'

         })(arg1,arg2)}
         ```

      - *Example: greetings.js*
      ```
          (function(app, chkErr) { // our required IIFE wrapper

              //calls the initialize function when jQuery is loaded.
              $(initializeApplication);

              //This function gathers page VIEW dependencies (templates, contents)
              //then renders the page.
              app.utils.getPageResources(chkErr(function(templates, content, config) {      
            
              app.utils.renderPage(/*app.*/templates.page_index, /*app.*/content);
              
              }));
            
              //some page specific greeting script code block
                var teamGreeting = {
                      greet: function () {
                            alert("Hello, Team!");
                          }
                };
              $.ready(teamGreeting.greet()); //alerts 'Hello, Team!' when DOM is loaded.

          })(window.app, app.utils.checkForErrors);

      ```
    - *Tip*: If your page does not have any "page specific scripts" right away, that is fine too. Still add the IIFE and the initializer code base to the script file for that page and save it. When/if you add code specific to the page like page event listeners or other functions, make sure that those functions are nested inside the IIFE as shown above.

6. If you want to insert partials in a page template, the next step would be to place the appropriate partial tags in your template.
    - Example greeting.hbs template tagged with header and footer partials. Partial syntax: {{> foldername/file }}
      ```
        {{> partials/header}}

        <h1>{{greeting}} {{name}}</h1>
        <p>{{message}}</p>

        {{> partials/footer}}

      ```

7. Next, save your css file under the styles folder and your script file under the scripts folder respectively with a name appropriate to the template that you are working on.
    - Example: **assets/styles/page/greetings.css**
    - Example: **assets/scripts/page/greetings.js**
    - *Tip*: If your style or script is for a partial it should be saved in a file under styles/app/ or scripts/app.

8. Lastly, be sure to include **all** dependencies (stylesheet links & script tags) into the head of the corresponding html page where your template will be rendered.
    - High level example of the "greeting" page. Be certain that your script file containing the page initializer scripts is added to the head element **last** after jquery, bootstrap, services and etc. In this case greetings.js is loaded last as shown below:
      ```
      <!doctype html>
          <html>
            <head>
                <meta charset="utf-8">
                <title>Greeting</title>
                <meta .......stuff">
                <link ....library/framework styles">
                <link .....global styles">
                <link rel="stylesheet" href="assets/styles/page/greeting.css">

                <script ..... cool library/framework ...></script>
                <script ..... utils..app...services...."></script>
                <script src="/assets/scripts/page/greeting.js"></script>
            </head>
            <body></body>
          </html>
      ```

9. That is pretty much our general work flow for templating. There are other helpers that we can use with handlebars such as 
"{{#each}}" and {{#if}} which can be very helpful in creating templates with a DRY approach. Checkout the reference ["handlebarsjs builtin_helpers"](#resources) above for details.

## How it all works!
We created an html template of an html component or html page and stored it in a separate file under the templates folder. (e.g: templates/greeting.hbs)

```greeting.hbs source
   <!-- Pre-compiled templates are often referred to as "source" in handlebars.js -->


   <h1>{{greeting}} {{name}}</h1>
   <p>{{message}} </p>

```

- Notice that our demo greeting.hbs template does not have an `<html>` or `<body>` parent element.
  This technique is intended so that we can dynamically append templates to the DOM during run-time with jQuery.
  This demo template itself, is just a pair of header tags with a greeting inside followed by a pair of paragraph tags with a message inside.
  
- Also, notice the two pairs of curly braces inside the html tags. The {{ ... }} placeholders in the file are Handlebars expressions. They will be replaced with the property values of the JSON content file.


Once you have the template, the next step is the interesting part. We call the **Handlebars compile** function to process the template *source*. **Handlebars compile** returns a function that accepts a **data object** as its argument.

```
<!--Sidenote: We use AJAX to obtain the html text from the greeting.hbs file and assign that html text to the "source" variable -->

var source = " <h1>{{greeting}}  {{user-details.name}}</h1>
            <p>{{message}} </p>";

var templateFunc = Handlebars.compile(source);
```


Now every time the template function gets called with data, an interpolated string will be returned.
- Example content data: 
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
- Example template function signature:

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

The output from this example would be:
# Hello Team
Tomorrow we are invited out for tacos.
