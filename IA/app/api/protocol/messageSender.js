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
		console.log("sendMessage"+clientObject.response);
		var JSONString = JSON.stringify(clientObject.response);
		if(clientObject.clientType=="NET"){			
			clientObject.connection.write(JSONString+"\n"); // NET library, comunicación a agentes o aplicaciones externas
			resultado = "Mensaje enviado vía socket:"+JSONString;
			fnAplazada.resolve(resultado);
		}else{
			clientObject.connection.emit("data",JSONString); //Socket.IO, comunicación con navegador
			resultado = "Mensaje enviado vía browser:"+JSONString;
			fnAplazada.resolve(resultado);
		}
		return fnAplazada.promise;
	}

	this.sendErrUnknownCommand = function(clientObject){
		response = new Object();
		response.command = "ERR_UNKNOWN_COMMAND";
		response.arguments = null;
		clientObject.response = response;
		this.sendMessage(clientObject);
	}

	this.sendErrOutOfContextCommand = function(clientObject){
		response = new Object();
		response.command = "ERR_OUT_OF_CONTEXT";
		response.arguments = null;
		clientObject.response = response;
		this.sendMessage(clientObject);
	}

	this.sendErrArgsCommand = function(clientObject){
		response = new Object();
		response.command = "ERR_ARGS";
		response.arguments = null;
		clientObject.response = response;
		this.sendMessage(clientObject);
	}
}

module.exports.messageSender = messageSender;