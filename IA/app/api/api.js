var Partida = require('./Partida.js');
var Reglas = require('./Reglas.js');
var Tablero = require('./Tablero.js');
var Jugador = require('./Jugador.js');
var Match = require('./Match.js');

function api(){
	this.listaPartidas = new Object();
	this.listaUsuariosConectados = new Object();
	this.listaMatch = new Object();



	this.mensajeDesdeSocket = function(socket, data){
		while(data[0]!=123&&data.length>0){
			data = data.slice(1,data.length);
		}
		try{
			var data = JSON.parse(data);
			this.protocolo(socket, data);
		}catch(error){
			this.protocolo(socket, error);
		}		
		socket.emit("respuesta", "respuesta desde api\n");
	}

	this.mensajeDesdeNet = function(client, data){	
		console.log("data: "+data);
		while(data[0]!=123){
			console.log("asdf");
			data = data.slice(1,data.length);
		}
		var data = JSON.parse(data);
		this.protocolo(client, data);
		client.write("respuesta desde api\n");
	}	

	this.protocolo = function(client, data){
		console.log(data);
		switch(data["command"]){
			case "PROBE": console.log("PROBE");
			break;
			case "PROTOCOL": console.log("PROTOCOL");
			break;
			case "PROTO_USE_OK": console.log("PROTO_USE_OK");
			break;
			case "REGISTER": console.log("REGISTER");
			break;
			case "REG_SUCESS": console.log("REG_SUCESS");
			break;
			case "SESSION_START": console.log("SESSION_START");
			break;
			case "ACCEPT": console.log("ACCEPT");
			break;
			case "SESSION_QUIT": console.log("SESSION_QUIT");
			break;
			case "STATS_QUERY": console.log("STATS_QUERY");
			break;
			case "MATCH_REQ_INFO": console.log("MATCH_REQ_INFO");
			break;
			case "MATCH_LOOKUP": console.log("MATCH_LOOKUP");
			break;
			case "MATCH_LOOKUP_CANCEL": console.log("MATCH_LOOKUP_CANCEL");
			break;
			case "MATCH_READY": console.log("MATCH_READY");
			break;
			case "MATCH_REJECT": console.log("MATCH_REJECT");
			break;
			case "ROUND_START_ACK": console.log("ROUND_START_ACK");
			break;
			case "TURN_END": console.log("TURN_END");
			break;
			case "TURN_QUERY": console.log("TURN_QUERY");
			break;
			case "CLOCK_REQ": console.log("CLOCK_REQ");
			break;
			case "BOARD_CHECK": console.log("BOARD_CHECK");
			break;
			case "BOARD_REQ": console.log("BOARD_REQ");
			break;
			case "PASS": console.log("PASS");
			break;
			case "RETIRE_ROUND": console.log("RETIRE_ROUND");
			break;
			case "RETIRE_MATCH": console.log("RETIRE_MATCH");
			break;
			case "PROJECTED_TIE": console.log("PROJECTED_TIE");
			break;
			case "PROJECTED_TIE_DEACT": console.log("PROJECTED_TIE_DEACT");
			break;
			case "ERR_UNKNOWN_COMMAND": console.log("ERR_UNKNOWN_COMMAND");
			break;
			case "ERR_ARGS": console.log("ERR_ARGS");
			break;
			case "PANIC_QUIT": console.log("PANIC_QUIT");
			break;
			case "WAIT": console.log("WAIT");
			break;
			case "RESUME": console.log("RESUME");
			break;
			case "PING": console.log("PING");
			break;
			case "PONG": console.log("PONG");
			break;
			default: console.log("Error: comando no reconocido: "+ data["command"]);			
		}
	}
}

module.exports.api = api;