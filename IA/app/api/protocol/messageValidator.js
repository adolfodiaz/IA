var MessageSender = require('./messageSender.js');
var messageSender = new MessageSender.messageSender();
var Api = require('./../api.js');
api = new Api.api();

var TestComponent = require('./TestComponent.js');
var testComponent = new TestComponent.testComponent();

var InputProcessor = require('./inputProcessor.js');
var inputProcessor = new InputProcessor.inputProcessor();

var StateMachine = require('./stateMachine.js');
var stateMachine = new StateMachine.stateMachine();


function messageValidator(){

	this.protocolManager = function(connection, data, clientType){
		
		//convertiremos los parámetros del cliente en un objeto clientObject
		var clientObject = new Object();
		clientObject.connection = connection;
		clientObject.data = data;
		clientObject.clientType = clientType;
		
		/*Dependiendo del comando utilizado ofreceremos respuesta
		si el comando no se conoce, responderemos usando ERR_UN
		
		Lista de pasos para la verificación:
		1. El comando que nos mandan es admitido por el Game Manager (se verifica con la sentencia SWITCH, el default
		indica que el comando no se reconoce)
		
		2. El comando era esperado ()

		3. Los argumentos que acompañan al comando son los correctos (no hay argumentos que son vacíos o tienen un patrón
		distinto al esperado para cada caso)
		*/
		switch(data.command){
			//eliminar TEST en la producción final
			case "TEST":
				console.log("TEST");
				testComponent.testFunction("adolfo");
				break;

			case "RESET":
				//resetea la stateMachine y la devuelve a Init
				break;
			
			//Funciones desactivadas, la comunicación del protocolo partirá en REGISTER	
			/*case "PROBE": console.log("PROBE");
				console.log("Comando recibido: PROBE");
				validateProbe();
				//api.probe(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PROTOCOL": console.log("PROTOCOL");
				api.protocol(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PROTO_USE_OK": console.log("PROTO_USE_OK");
				api.proto_use_ok(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;*/

			case "REGISTER": console.log("REGISTER");
				validateRegister(clientObject);
				//api.register(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);								
			break;
			case "SESSION_START": console.log("SESSION_START");
				api.session_start(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "ACCEPT": console.log("ACCEPT");
				api.accept(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "SESSION_QUIT": console.log("SESSION_QUIT");
				api.session_quit(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "STATS_QUERY": console.log("STATS_QUERY");
				api.stats_query(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "MATCH_REQ_INFO": console.log("MATCH_REQ_INFO");
				api.match_req_info(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "MATCH_LOOKUP": console.log("MATCH_LOOKUP");
				api.match_lookup(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "MATCH_LOOKUP_CANCEL": console.log("MATCH_LOOKUP_CANCEL");
				api.match_lookup_cancel(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "MATCH_READY": console.log("MATCH_READY");
				api.match_ready(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "MATCH_REJECT": console.log("MATCH_REJECT");
				api.match_reject(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "ROUND_START_ACK": console.log("ROUND_START_ACK");
				api.round_start_ack(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "TURN_END": console.log("TURN_END");
				api.turn_end(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "TURN_QUERY": console.log("TURN_QUERY");
				api.turn_query(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "CLOCK_REQ": console.log("CLOCK_REQ");
				api.clock_req(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "BOARD_CHECK": console.log("BOARD_CHECK");
				api.board_check(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "BOARD_REQ": console.log("BOARD_REQ");
				api.board_req(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PASS": console.log("PASS");
				api.pass(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "RETIRE_ROUND": console.log("RETIRE_ROUND");
				api.retire_round(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "RETIRE_MATCH": console.log("RETIRE_MATCH");
				api.retire_match(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PROJECTED_TIE": console.log("PROJECTED_TIE");
				api.projected_tie(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PROJECTED_TIE_DEACT": console.log("PROJECTED_TIE_DEACT");
				api.projected_tie_deact(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "ERR_UNKNOWN_COMMAND": console.log("ERR_UNKNOWN_COMMAND");
				api.err_unknown_command(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "ERR_ARGS": console.log("ERR_ARGS");
				api.err_args(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PANIC_QUIT": console.log("PANIC_QUIT");
				api.panic_quit(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "WAIT": console.log("WAIT");
				api.wait(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "RESUME": console.log("RESUME");
				api.resume(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PING": console.log("PING");
				api.ping(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			case "PONG": console.log("PONG");
				api.pong(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;
			default://Comando no reconocido
				console.log("Error: comando no reconocido: "+ data["command"]);
				//llamar al messageSender y enviar ERR_UNKNOWN_COMMAND
				messageSender.sendErrUnknownCommand(clientObject);

		}
	}
}	
/*VERIFICADORES VARIOS*/

function validateRegister(clientObject){
		//Verificando argumentos
		var args = clientObject.data.arguments;
		var preProcResults = new Object();
		clientObject.name = clientObject.data.arguments.clientName;
		//por defecto, todos los argumentos son válidos hasta que se demuestre lo contrario
		preProcResults.okName = true;
		preProcResults.okPass = true;
		preProcResults.okType = true;
		if ((args.clientName == null) || (args.clientName == "") || (args.clientName == {})){
			preProcResults.okName = false
		}
		if ((args.clientPass == null)||(args.clientPass == "")||args.clientPass == {}){
			preProcResults.okPass = false;
		}
		if((args.clientType == null)||(args.clientType == "")||(args.clientType == {})){
			okType = false;
		} else if (!((args.clientType == "AI")||(args.clientType == "HUMAN"))){
			preProcResults.okType = false;
		}
		clientObject.preProcResults = preProcResults;
		//Mandando al inputProcessor
		//Para REGISTER, nos saltaremos
		inputProcessor.registerPreprocessor(clientObject);
}

function checkAutomataState(clientObject){
		var automataResult = new Object();
		clientObject.automata = automataResult;
		clientObject.automata.state = onlinePlayersList[clientObject.name].automataState;
		stateMachine.transition(clientObject).done(checkAutomataStateReturn);
}

//Envía el resultado a la función del inputProcessor (preprocesador) correcto
//según el comando enviado por el 
function checkAutomataStateReturn(clientObject){
	if (clientObject.automata.result == false){ //no se esperaba este mensaje, enviar ERR_OUT_OF_CONTEXT
		messageSender.sendErrOutOfContextCommand(clientObject);
	} else { //derivar al preprocesador, el error por argumentos se chequea allá
		console.log("Es válido");
	}
}










module.exports.messageValidator = messageValidator;