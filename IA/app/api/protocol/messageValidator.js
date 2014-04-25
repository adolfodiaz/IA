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

			case "REGISTER":
				console.log("REGISTER");
				validateRegister(clientObject);
			break;
			
			case "SESSION_START": console.log("SESSION_START");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateSessionStart(clientObject);
				}
				//api.session_start(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "ACCEPT": console.log("ACCEPT");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateAccept(clientObject);
				}
				//api.accept(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "SESSION_QUIT": console.log("SESSION_QUIT");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateSessionQuit(clientObject);
				}
				//api.session_quit(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "STATS_QUERY": console.log("STATS_QUERY");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateStatsQuery(clientObject);
				}
				//api.stats_query(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "MATCH_REQ_INFO": console.log("MATCH_REQ_INFO");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateMatchReqInfo(clientObject);
				}
				//api.match_req_info(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "MATCH_LOOKUP": console.log("MATCH_LOOKUP");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateMatchLookup(clientObject);
				}
			break;

			case "MATCH_LOOKUP_CANCEL": console.log("MATCH_LOOKUP_CANCEL");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateMatchLookupCancel(clientObject);
				}
				//api.match_lookup_cancel(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "MATCH_READY": console.log("MATCH_READY");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateMatchReady(clientObject);
				}
				//api.match_ready(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "MATCH_REJECT": console.log("MATCH_REJECT");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateMatchReject(clientObject);
				}
				//api.match_reject(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "ROUND_START_ACK": console.log("ROUND_START_ACK");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateRoundStartAck(clientObject);
				}
				//api.round_start_ack(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "TURN_END": console.log("TURN_END");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateTurnEnd(clientObject);
				}
				//api.turn_end(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "TURN_QUERY": console.log("TURN_QUERY");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateTurnQuery(clientObject);
				}
				//api.turn_query(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "CLOCK_REQ": console.log("CLOCK_REQ");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateClockReq(clientObject);
				}
				//api.clock_req(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "BOARD_CHECK": console.log("BOARD_CHECK");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateBoardCheck(clientObject);
				}
				//api.board_check(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "BOARD_REQ": console.log("BOARD_REQ");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateBoardReq(clientObject);
				}
				//api.board_req(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "PASS": console.log("PASS");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validatePass(clientObject);
				}
				//api.pass(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "RETIRE_ROUND": console.log("RETIRE_ROUND");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateRetireRound(clientObject);
				}
				//api.retire_round(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "RETIRE_MATCH": console.log("RETIRE_MATCH");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateRetireMatch(clientObject);
				}
				//api.retire_match(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "PROJECTED_TIE": console.log("PROJECTED_TIE");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateProjectedTie(clientObject);
				}
				//api.projected_tie(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "PROJECTED_TIE_DEACT": console.log("PROJECTED_TIE_DEACT");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateProjectedTieDeact(clientObject);
				}
				//api.projected_tie_deact(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "ERR_UNKNOWN_COMMAND": console.log("ERR_UNKNOWN_COMMAND");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateErrUnknownCommand(clientObject);
				}
				//api.err_unknown_command(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "ERR_ARGS": console.log("ERR_ARGS");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateErrArgs(clientObject);
				}
				//api.err_args(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "PANIC_QUIT": console.log("PANIC_QUIT");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validatePanicQuit(clientObject);
				}
				//api.panic_quit(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "WAIT": console.log("WAIT");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateWait(clientObject);
				}
				//api.wait(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "RESUME": console.log("RESUME");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validateResume(clientObject);
				}
				//api.resume(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "PING": console.log("PING");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validatePing(clientObject);
				}
				//api.ping(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			case "PONG": console.log("PONG");
				if(clientObject.data.arguments == null){
					messageSender.sendErrArgsCommand(clientObject);
				} else {
					validatePong(clientObject);
				}
				//api.pong(clientObject).then(outputProcessor.buildResponse).done(messageSender.sendMessage);
			break;

			default://Comando no reconocido
				console.log("Error: comando no reconocido: "+ data["command"]);
				//llamar al messageSender y enviar ERR_UNKNOWN_COMMAND
				messageSender.sendErrUnknownCommand(clientObject);
				break;
		}
	}
}	
/*VERIFICADORES VARIOS*/

function validateRegister(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();
	//clientObject.name = clientObject.data.arguments.clientName;
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

function validateSessionStart(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateAccept(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateSessionQuit(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateStatsQuery(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateMatchReqInfo(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateMatchLookup(clientObject){
	//console.log("Validando MatchLookup");
	//inputProcessor.matchLookupPreprocessor(clientObject);
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateMatchLookupCancel(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateMatchReady(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateMatchReject(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateRoundStartAck(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateTurnEnd(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateTurnQuery(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateClockReq(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateBoardCheck(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateBoardReq(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validatePass(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateRetireRound(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateRetireMatch(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateProjectedTie(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateProjectedTieDeact(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateErrUnknownCommand(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateErrArgs(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validatePanicQuit(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateWait(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validateResume(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validatePing(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function validatePong(clientObject){
	//Verificando argumentos
	var args = clientObject.data.arguments;
	var preProcResults = new Object();

	//checkAutomataState(clientObject);//pasar por el autómata, ACTIVAR
	checkAutomataStateReturn(clientObject);//borrar esta línea cuando haya que pasar por el autómata
}

function checkAutomataState(clientObject){
		var automataResult = new Object();
		clientObject.automata = automataResult;
		clientObject.automata.state = onlinePlayersList[clientObject.name].automataState;
		stateMachine.transition(clientObject).done(checkAutomataStateReturn);
}

//Envía el resultado a la función del inputProcessor (preprocesador) correcto
//según el comando enviado
function checkAutomataStateReturn(clientObject){
	//if (clientObject.automata.result == false){ //no se esperaba este mensaje, enviar ERR_OUT_OF_CONTEXT
	if(false){//cambiar por la línea de arriba, BYPASS del autómata
		messageSender.sendErrOutOfContextCommand(clientObject);
	} else { //derivar al preprocesador
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

			case "SESSION_START":
				inputProcessor.sessionStartPreprocessor(clientObject);
			break;

			case "ACCEPT":
				inputProcessor.acceptPreprocessor(clientObject);
			break;

			case "SESSION_QUIT":
				inputProcessor.sessionQuitPreprocessor(clientObject);
			break;

			case "STATS_QUERY":
				inputProcessor.statsQueryPreprocessor(clientObject);
			break;

			case "MATCH_REQ_INFO":
				inputProcessor.matchReqInfoPreprocessor(clientObject);
			break;

			case "MATCH_LOOKUP":
				inputProcessor.matchLookupPreprocessor(clientObject);
			break;

			case "MATCH_LOOKUP_CANCEL":
				inputProcessor.matchLookupCancelPreprocessor(clientObject);
			break;

			case "MATCH_READY":
				inputProcessor.matchReadyPreprocessor(clientObject);
			break;

			case "MATCH_REJECT":
				inputProcessor.matchRejectPreprocessor(clientObject);
			break;

			case "ROUND_START_ACK":
				inputProcessor.roundStartAckPreprocessor(clientObject);
			break;

			case "TURN_END":
				inputProcessor.turnEndPreprocessor(clientObject);
			break;

			case "TURN_QUERY":
				inputProcessor.turnQueryPreprocessor(clientObject);
			break;

			case "CLOCK_REQ":
				inputProcessor.clockReqPreprocessor(clientObject);
			break;

			case "BOARD_CHECK":
				inputProcessor.boardCheckPreprocessor(clientObject);
			break;

			case "BOARD_REQ":
				inputProcessor.boardReqPreprocessor(clientObject);
			break;

			case "PASS":
				inputProcessor.passPreprocessor(clientObject);
			break;

			case "RETIRE_ROUND":
				inputProcessor.passPreprocessor(clientObject);
			break;

			case "RETIRE_MATCH":
				inputProcessor.retireMatchPreprocessor(clientObject);
			break;

			case "PROJECTED_TIE":
				inputProcessor.projectedTiePreprocessor(clientObject);
			break;

			case "PROJECTED_TIE_DEACT":
				inputProcessor.projectedTiePreprocessor(clientObject);
			break;

			case "ERR_UNKNOWN_COMMAND":
				inputProcessor.errUnknownCommandPreprocessor(clientObject);
			break;

			case "ERR_ARGS":
				inputProcessor.errArgsPreprocessor(clientObject);
			break;

			case "PANIC_QUIT":
				inputProcessor.panicQuitPreprocessor(clientObject);
			break;

			case "WAIT":
				inputProcessor.waitPreprocessor(clientObject);
			break;

			case "RESUME":
				inputProcessor.resumePreprocessor(clientObject);
			break;

			case "PING":
				inputProcessor.pingPreprocessor(clientObject);
			break;

			case "PONG":
				inputProcessor.pongPreprocessor(clientObject);
			break;
		}
	}
}










module.exports.messageValidator = messageValidator;