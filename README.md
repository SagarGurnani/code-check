# code-check
Node.js module to check your repository for private key files and JavaScript code for sensitive tokens and keys. Can help you prevent a commit if such files/code are found. It uses the Esprima parser to analyze the code ( esprima.org ).

# Installation
>```
>npm install code-check


# Usage

>```
>//Require the 'code-check' module
>var codeCheck = require('code-check');
>
>/*Run the check for sensitive files/code 
>in your current working directory and its children*/
>codeCheck.runCheck();

# Configuration
Present in /node_modules/code-check/restrictedKeywords.json.

>```
>{
>	"keyWords" : [
>		"accessKeyId",
>		"secretAccessKey",
>		"token",
>		"secret"
>	],
>
>	"keyFiles" : [
>		"keys",
>		"key",
>		"id_rsa",
>		".pub",
>		".pem"
>	],
>	
>	"ignored" : [
>		"helper.js",
>		"main.js",
>		"restrictedKeywords.json"
>	]	
>}

Enter keywords to search for in your JavaScript code, in 'keyWords[]'.
Enter keywords to search for sensitive filenames, in 'keyFiles[]'.
Enter files to be ignored for sensitive content in 'ignored[]'.

Some defaults have been set up.

# Result
After the check finishes running, the tool with give your repo a clean chit or warn you
of potentially sensitive files/code in your repo


