/*
	inputProcessor.js

	Procesador de entrada de la subAPI de Comunicaciones

	Ante un comando correcto, realiza las consultas necesarias a la API para poder generar un resultado
	y deriva el resultado a la función Postprocessor.

*/

function inputProcessor(){
	this.registerPreprocessor = function(clientObject){
		api.register(clientObject).then(registerPostprocessor);
	}
}

module.exports.inputProcessor = inputProcessor;