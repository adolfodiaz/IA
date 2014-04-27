/*
	messageSender.js

	Componente emisor de mensajes de la subAPI de Comunicaciones.

	Función pública: sendMessage(conexión, comando, objeto Arguments)
	Comando es un Objeto: {"command":"comando"} que falta añadirle el argumentsObject

*/
var Q = require('q');

function messageSender(){
	this.sendMessage = function(clientObject){
		var fnAplazada = Q.defer();
		var resultado;
		
		var JSONString = JSON.stringify(clientObject.response);

		//if ((clientObject.api.noEnviar != null) || (clientObject.api.noEnviar != '') || (clientObject.api.noEnviar != {})) {
			//if (clientObject.api.noEnviar == false) {
				
				console.log("sendMessage: "+JSONString+"   "+clientObject.clientType); 
				if(clientObject.clientType=="NET"){			
					clientObject.connection.write(JSONString+"\n"); // NET library, comunicación a agentes o aplicaciones externas
					resultado = "Mensaje enviado vía socket:"+JSONString;			
				}else{
					clientObject.connection.emit("data",JSONString); //Socket.IO, comunicación con navegador			
					resultado = "Mensaje enviado vía browser:"+JSONString;
				}

			//} else {
			//	console.log(clientObject.response.command + " operación realizada con exito!");
			//}
		//}


		fnAplazada.resolve(resultado);
		return fnAplazada.promise;
	}

	this.sendErrUnknownCommand = function(clientObject){
		response = new Object();
		response.command = "ERR_UNKNOWN_COMMAND";
		response.arguments = new Object();//equivale a "{}"
		clientObject.response = response;
		this.sendMessage(clientObject);
	}

	this.sendErrOutOfContextCommand = function(clientObject){
		response = new Object();
		response.command = "ERR_OUT_OF_CONTEXT";
		response.arguments = new Object();
		clientObject.response = response;
		this.sendMessage(clientObject);
	}

	this.sendErrArgsCommand = function(clientObject){
		response = new Object();
		response.command = "ERR_ARGS";
		response.arguments = new Object();
		clientObject.response = response;
		this.sendMessage(clientObject);
	}

	this.sendErrInternalGMError = function(clientObject){
		response = new Object();
		response.command = "ERR_INTERNAL_GM_ERROR";
		response.arguments = new Object();
		clientObject.response = response;
		this.sendMessage(clientObject);
	}
}

module.exports.messageSender = messageSender;