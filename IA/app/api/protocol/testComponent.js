/*
	testComponent.js

	Componente para pruebas de la subAPI de comunicaciones

	Consta de una única función testFunction() que es activada cuando se recibe un
	comando TEST desde un navegador.

	El procesamiento de los argumentos enviados a través del comando TEST o los argumentos que testFunction
	requiera irá variando constantemente.
*/

var Q = require('q');

function testComponent(){
	this.testFunction = function(inputText){
		console.log("TEST activado");
		dummy(inputText).then(dummy2).done(console.log);

	}
	
}

function dummy(inputText){
	var funcionAplazada = Q.defer();
	console.log("Entre a dummy");
	var resultado = "0"+inputText+"0";
	funcionAplazada.resolve(resultado);
	return funcionAplazada.promise;
}

function dummy2(inputTextFromDummy){
	console.log("Entre a dummy2 y recibi:"+inputTextFromDummy);
	var funcionAplazada = Q.defer();
	var resultado = "1"+inputTextFromDummy+"1";
	funcionAplazada.resolve(resultado);
	return funcionAplazada.promise;
}

module.exports.testComponent = testComponent;