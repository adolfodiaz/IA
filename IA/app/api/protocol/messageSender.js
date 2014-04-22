function messageSender(){
	this.sendMessage = function(connection, clientType, message){
		if(clientType=="NET"){			
			connection.write(JSON.stringify(message)+"\n"); // NET library, comunicación a agentes o aplicaciones externas
		}else{
			connection.emit("data",JSON.stringify(message)); //Socket.IO, comunicación con navegador
		}
	}
}

module.exports.messageSender = messageSender;