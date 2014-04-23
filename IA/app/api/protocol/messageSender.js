/*
	messageSender.js

	Componente emisor de mensajes de la subAPI de Comunicaciones.

	Función pública: sendMessage(conexión, comando, objeto Arguments)
	Comando es un Objeto: {"command":"comando"} que falta añadirle el argumentsObject

*/
var Q = require('q');

function messageSender(){
	this.sendMessage = function(clientObject, messageObject){
		var fnAplazada = Q.defer();
		var resultado;
		var JSONString = JSON.stringify(messageObject);
		if(clientType=="NET"){			
			connection.write(JSONString+"\n"); // NET library, comunicación a agentes o aplicaciones externas
			resultado = "Mensaje enviado vía socket:"+JSONString;
			fnAplazada.resolve(resultado);
		}else{
			connection.emit("data",JSONString); //Socket.IO, comunicación con navegador
			resultado = "Mensaje enviado vía browser:"+JSONString;
			fnAplazada.resolve(resultado);
		}
		return fnAplazada.promise;
	}

	this.sendMessageTEMP = function(){

	}
}

module.exports.messageSender = messageSender;