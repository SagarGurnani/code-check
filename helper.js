module.exports = {
	deepTraverse : function(path, callback){
		var fs = require('fs');

		var continueLoop = true;
		var separatorWin = '\\';
		var separatorLinux = '/';
		var separator;

		if(process.platform.indexOf('win') == 0){
			separator = separatorWin;
		}
		else{
			separator = separatorLinux;
		}

		var temp=[];
		var dir=[];
		var files=[];

		do{
			temp = fs.readdirSync(path);
			//console.log("temp = ",temp);

			for(var i in temp){
				try{
					if(fs.lstatSync(path+separator+temp[i]).isDirectory() && path.indexOf('node_modules') < 0){
						dir.push(path+separator+temp[i]);
					}
				}
				catch(e){
				}

				try{
					if(fs.lstatSync(path+separator+temp[i]).isFile()){

						var fullPath = path+separator+temp[i];
						// if(fullPath.lastIndexOf('.js') == fullPath.length - 3){
						// 	console.log('found js file');
						// 	files.push(fullPath);
						// }
						files.push(fullPath);

					}
				}
				catch(e){

				}
			}

			if(dir.length == 0){
				continueLoop = false;
			}
			else{
				path = dir[0];
				dir.splice(0,1);
			}
		}while(continueLoop);

		callback(files);
	},

	findConcerns : function(result,callback){

		var fs = require('fs');

		var esprima = require('esprima');
		var options = {tokens : true};

		var sensFiles = [];
		var sensWords = [];

		var pathToModules = './node_modules/code-check/';

		var restricted = fs.readFileSync(pathToModules+'restrictedKeywords.json','utf8');
		restricted = JSON.parse(restricted);
		var keyWords = restricted.keyWords.join('|');
		var keyFiles = restricted.keyFiles.join('|');
		var ignored = restricted.ignored.join('|');
		var keyWordsRegex = new RegExp(keyWords);
		var keyFilesRegex = new RegExp(keyFiles);
		var ignoredRegex = new RegExp(ignored);


		for(var i in result){
			if(keyFilesRegex.test(result[i].toLowerCase()) && ignoredRegex.test(result[i])){
				//err+=result[i] + ' may contain sensitive info!\n';
				//console.log("file = ",result[i]);
				if(sensFiles.indexOf(result[i]) < 0){
					sensFiles.push(result[i]);
				}
			}

			if(result[i].lastIndexOf('.js') == result[i].length - 3 && ignoredRegex.test(result[i])){
				//console.log("codefile=",result[i]);
				var myCode = fs.readFileSync(result[i]);

				var myTokens = esprima.tokenize(myCode,options);
				var myTokenValue;

				for(var j in myTokens){
					if(myTokens[j].type == 'String'){
						myTokenValue = myTokens[j].value;

						if(keyWordsRegex.test(myTokenValue.toLowerCase())){
							//err+=result[i] + ' may contain sensitive info in the code\n'
							if(sensWords.indexOf(result[i]) < 0){
								sensWords.push(result[i]);
							}
						}
					}
				}
			}
		}
		callback(sensFiles,sensWords);
	}
};
