function messageSender(){
	this.sendMessage = function(connection, clientType, message){
		if(clientType=="AI"){			
			connection.write(JSON.stringify(message)+"\n");
		}else{
			connection.emit("data",JSON.stringify(message));
		}
	}
}

module.exports.messageSender = messageSender;