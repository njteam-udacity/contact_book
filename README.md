# contact_book
A contact book application utilizing HTML, CSS, Bootstrap, and JavaScript.

## Initial Set up
### Clone the repo:
 1. $ git clone < YOURTEAMREPO >
 2. $ git checkout develop
 3. $ git branch -b < BRANCHNAME >
     - this creates the branch and immediately checks out the branch

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
> - git create branch feature-navigationBar-#5

Checkout feature branch (feature/name of feature):
 - `$ git checkout feature/create-navigation-menu`

Install application dependencies:
- Download/install node.js LTS (recommended):https://nodejs.org/en/download/
  - Run npm install:
    - `$ npm install`

### Start the server:
- $ npm start

### Initial file structure
```

── assets
|    ├── audio
|    ├── images
|    ├── styles
|    └── scripts
├── data
|    └── content.json
├── .gitignore
├── favicon.ico
├── index.html
├── package.json
└── README.md

```
