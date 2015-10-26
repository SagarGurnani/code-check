module.exports={
	runCheck : function(){
		var helper = require('./helper.js');
		var fs = require('fs');

		var path = process.cwd();

		helper.deepTraverse(path,function(result){
	
			helper.findConcerns(result,function(sensFiles,sensWords){
				
				if(sensWords.length == 0 && sensFiles.length == 0){	

					console.log('Success! No sensitive code/files found.');
				}
				else{

					if(sensFiles.length > 0){
						
						for(i in sensFiles){
							console.log('Warning!! '+sensFiles[i]+ ' may be a sensitive file');
						}

					}
					if(sensWords.length > 0){
						
						for(j in sensFiles){
							console.log('Warning!! '+sensWords[j]+ ' may contain sensitive code');
						}
							
					}
				}
			});
		});
	}
}






