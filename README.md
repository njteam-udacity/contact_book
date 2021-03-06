# contact_book
A contact book application utilizing HTML, CSS, Bootstrap, and JavaScript.

## Initial Set up

### Clone the repo:
 1. $ git clone < YOURTEAMREPO >
 2. $ git checkout develop
 3. $ git checkout -b < BRANCHNAME >
     - this creates the branch and immediately checks out the branch
     - see below for branch naming convention

> **Branch Naming Convention**
> - Branch names consists of 3 elements
>   - Issue type
>   - Feature Name
>   - Issue Number (For waffle automation, we need to use # and cannot use / between feature name and issue number)
>
> **We'll have 4 issue types for now**
> - bug
> - feature
> - style
> - refactor
>
> **Issue Number**
> - This will come from the one generated from Waffle stories
>
> **Feature Name**
> - Use camel case for feature names
>
> **Example**
> - git checkout -b feature-navigationBar-#5

### Install application dependencies:
- Download/install node.js LTS (recommended):https://nodejs.org/en/download/
  - Run npm install:
    - `$ npm install`

### Start the server:
- $ npm start

- **NOTICE**
  - If you are using **MAC OS** or **Linux OS**
    then you may need superuser permissions to install
    dependencies that are required to run this application locally.
  - If you receive an error message in the browser, such as:
  - ![Error: Localhost refused:][img]
  - [img]: /assets/images/error.png 
    ```
    This site can't be reached 
    **localhost** refused to connect.

    ERR_CONNECTION_REFUSED
    ```
  - Then checkout your apple terminal or bash terminal to see if core dependencies were not installed. For example:

    ```
     which http-server
    
    ```
  
  - If http-server is not found then:

    ```
     sudo npm install -g http-server
    
    ```
    [Reference: https://en.wikipedia.org/wiki/Sudo](https://en.wikipedia.org/wiki/Sudo)

  - Once dependencies are installed, then you should be able to run the application successfully:
    
    ```
      npm start

    ```


### Initial file structure
```

── assets/
|    ├── audio/
|    ├── images/
|    ├── scripts/
|    |       ├── app/ (shared)
|    |       ├── page/ (page specific js)
|    |       └── vendors/ (public libraries)
|    └── styles/
|    |       ├── app/ (shared)
|    |       ├── fonts/
|    |       ├── page/ (page specific css)
|    |       └── vendors/ (public libraries)
├── content/
|    └── en/
|         ├── page/ (page/template specific content)
|         └── shared/
                └── global.json
├── data/
|    └── contacts.json
|
├── node_modules/
|
├── templates/
|    ├── page/ (page specific templates) 
|    └── partials/ (shared templates)
|
├── .gitignore
├── config.json (template and content file map)
├── favicon.ico
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── templating.md

```

## Working on your Branch

- Always do a git pull to make sure you are working on the latest code
- Always work on your branch
- Commit often: 
	- make atomic commits 
	- this makes it easier to revert to an older version without losing a lot of work

### Steps to take when working on your Branch
1. $ git checkout develop  
2. $ git pull origin develop  
3. $ git checkout < BRANCHNAME >

### Pushing your Commits
1. $ git status
2. $ git add -A
3. $ git pull origin develop
4. $ git commit -m "enter your commit message here"
5. $ git push origin < BRANCHNAME >

### Merging your commits to the Develop branch
1. Go to Github and "Open a pull request"
   (Create a new pull request by comparing changes across two branches.) 
2. base:**develop** compare: < BRANCHNAME >
   (If no conflicts:** Able to merge**)
3. Review your pull request header, update if necessary.
4. Review your pull request body, update the body to include:
    - Connects to #[issue number]
    -  or
    - Closes issue #[issue number]
5. Select a reviewer to review your code.
6. After the code is reviewed and approved, the reviewer will
   complete the pull request and merge your commits to the develop branch.