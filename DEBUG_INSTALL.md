*** I have followed these following links to make debugging worked in VScode with Firefox: ***

1. https://medium.com/@marshallswain/debugging-a-new-vue-cli-app-with-vs-code-ade4945e75f0

2. https://vuejs.o@cookbook/debugging-in-vscode.html



Step to reproduce: (some command may need to use "sudo" on Mac OS)

*** Note: IMPORTANT ***
- If you are going to creata a new project: follow all the steps from 1 to 12
- Otherwise, if you just want to clone source code, please ignore the steps from 1 to 6 and begin reading at step 7

1. run "npm remove -g vue-cli"
2. run "npm install -g @vue/cli"
3. run "vue create vue-app-rest-api"
4. open "vue-app-rest-api" folder with VS code
5. Create new file "vue.config.js" with the content as below:

    module.exports = {
      configureWebpack: {
          devtool: 'source-map'
      }
    }

6. Create folder ".vscode" containing file "lanch.json" with the content as below:
  {
    "version": "0.2.0",
    "configurations": [
      {
        "type": "firefox",
        "request": "launch",
        "name": "vuejs: firefox",
        "url": "http://localhost:8081",
        "webRoot": "${workspaceFolder}/src",
        "pathMappings": [{ "url": "webpack:///src/", "path": "${webRoot}/" }]
      }
    ]
  }
  
7. Note that Debugging is not working on Chorme and I don't know why
8. Install "Debugger for Firefox" exntension for VS code
9. run "npm run serve" or "npm run serve -- --port 8081"
10. In VS code menu, click on "Debug" -> "Start Debug" -> select "vuejs: firefox" from the left corner -> click on green button standing next to "vuejs: firefox"
11. Set a break point 
12. Please refer key shortcut as below to debug in VS code:
    Create or remove breakpoint on the current line: F9
    Execute code one statement at a time, following execution into function calls (Step Into): F11
    Execute the next line of code but not follow execution through any function calls (Step Over): F10
    Execute the remaining lines of a function in which the current execution point lies (Step Out): SHIFT + F11
    Restart a debugging session : CTRL + SHIFT + F5
    Resume execution of your code from the current statement to the selected statement (Run to Cursor): CTRL + F10
    Run debug the application, Move to next break point: F5