/*
	stateMachine.js

	Máquina de estado para el protocolo C4NP versión 1.0

*/

//NOTA: El estado inicial del autómata es register, esto debido a que el comando inicial para comunicarse ahora
//es REGISTER
//Esto implica que los mensajes PROBE, PROTOCOL y sus variantes están cancelados

var Q = require('q');
tTable = new Object();
/*
tTable["init, PROBE"] = "probing";

tTable["probing, PROBE"] = "probing";
tTable["probing, PROTOCOL"] = "pDefining";

tTable["pDefining, PROTO_FAIL"] = "outState";
tTable["pDefining, PROTO_USE"] = "pDefinition";
tTable["pDefining, PROTO_OK"] = "pDefined";
tTable["pDefining, PROTO_USER_OK"] = "pDefined";

tTable["pDefined, REGISTER"] = "register";*/

tTable["init, REGISTER"] = "register";

tTable["register, STATS"] = "register";
tTable["register, REG_FAIL"] = "outState";
tTable["register, REG_SUCCESS"] = "register";
tTable["register, SESSION_START"] = "preSession";
tTable["register, STATS_QUERY"] = "register";

tTable["preSession, DECLINE"] = "preSession";
tTable["preSession, ACCEPT"] = "session";
tTable["preSession, DECLINE_ACK"] = "outState";
tTable["preSession, RULES"] = "preSession";

tTable["session, SESSION_QUIT"] = "outState";
tTable["session, MATCH_LOOKUP"] = "matchSearching";
tTable["session, MATCH_REQ_INFO"] = "session";
tTable["session, MATCH_INFO"] = "session";
tTable["session, SESSION_END"] = "preSession";

tTable["matchSearching, MATCH_NOTIFY"] = "preMatch";
tTable["matchSearching, MATCH_LOOKUP_CANCEL"] = "session";

tTable["preMatch, MATCH_REJECT"] = "matchSearching";
tTable["preMatch, MATCH_READY"] = "match";
tTable["preMatch, MATCH_ADV_BUSY"] = "session";
tTable["preMatch, MATCH_NOTIFY_TIMEOUT"] = "session";

tTable["match, ROUND_START"] = "preRound";
tTable["match, MATCH_END"] = "session";

tTable["preRound, ROUND_START_ACK"] = "round";

tTable["round, ROUND_END"] = "match";
tTable["round, TURN"] = "turn";

tTable["turn, TURN_END"] = "round";
tTable["turn, TURN_TIMEOUT"] = "round";



function stateMachine() {
	this.transition = function(clientObject){
		var fnAplazada = Q.defer();
		var pair = clientObject.automata.state + ", " + clientObject.data.command;
		if (!(pair in tTable)){
			clientObject.automata.result = false;
			fnAplazada.resolve(clientObject);
		} else {
			clientObject.automata.result = true;
			onlinePlayersList[clientObject.name].updateState(tTable[pair]);
			fnAplazada.resolve(clientObject);
		}
		return fnAplazada.promise;

/*function stateMachine(command , state) {

	var pair = state + ", " + command;

	// WAIT Cliente -> GM
	if ((command == "OUTER_WAIT") && (state != "init")) {
		state = "outerPause";
		return state;
	}

	if ((command == "PANIC_QUIT") && (state != "init")) {
		state = "outState";
		return state;
	}

	if ((command == "STOP_DISCONNECT") && (state != "init")) {
		state = "outState";
		return state;
	}	

	if ((command == "STOP") && (state != "init")) {
		state = "innerPause";
		return state;
	}	

	// WAIT GM -> CLiente
	if ((command == "INNER_WAIT") && (state != "init")) {
		state = "innerPause";
		return state;
	}	

	if (!(pair in tTable)){
		return null;
	}

	else {
		state = tTable[pair];
		return state;

	}
}
*/
module.exports.stateMachine = stateMachine;




