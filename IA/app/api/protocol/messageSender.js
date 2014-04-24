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
		console.log("sendMessage"+clientObject.api.command);
		var JSONString = JSON.stringify(clientObject.api.command);
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

	this.sendMessageTEMP = function(){

	}
}

module.exports.messageSender = messageSender;