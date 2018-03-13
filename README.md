# contact_book
A contact book application utilizing HTML, CSS, Bootstrap, and JavaScript.

## Initial Set up

### Clone the repo:
 1. $ git clone < YOURTEAMREPO >
 2. $ git checkout develop
 3. $ git branch -b < BRANCHNAME >
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
> - git create branch feature-navigationBar-#5

### Install application dependencies:
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

## Working on your Branch

- Always do a git pull to make sure you are working on the latest code
- Always work on your branch
- Commit often 
	- make atomic commits 
	- this makes it easier to revert to an older version without losing a lot of work

### Steps to take when working on your Branch
1. $ git checkout development  
2. $ git pull origin development  
3.  $ git checkout < BRANCHNAME >

### Pushing your Commits
1. $ git checkout development  
2. $ git pull origin development  
3. $ git checkout < BRANCHNAME >
4. $ git merge development  
5. $ git push origin < BRANCHNAME >