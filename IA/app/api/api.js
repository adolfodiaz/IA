var mensajeDesdeSocket = function(socket, data){
	console.log("mensajeDesdeSocket = "+data);
	socket.emit("respuesta", "respuesta desde api\n");
}

var mensajeDesdeNet = function(client, data){
	console.log("mensajeDesdeNet = "+data);	
	client.write("respuesta desde api\n");
}

module.exports.mensajeDesdeSocket = mensajeDesdeSocket;
module.exports.mensajeDesdeNet = mensajeDesdeNet;

//setTimeout("chevo()",5000);

var listaPartidas = new Object();
var listaUsuariosConectados = new Object();


//clase
function Partida(){
	this.jugador1 = new Jugador();
	this.jugador2 = new Jugador();
	this.reglas = new Reglas();
	this.espectadores = new Array();
	this.tablero = new Tablero();
	this.horaInicio;
	this.quienPartio;
}

//clase
function Reglas(){
	this.tiempoPartida;
	this.tiempoTurno;	
	this.numPartida;
	this.tamTablero;
}

//clase
//casillas del jugador 1 se marcan con 1 y del jugador 2 con 2
function Tablero(){
	this.casillas = new Array();
	this.tamTablero;
	this.generarTablero = function(tam){
		this.tamTablero = tam;
		for(var i=0;i<tam;i++){
			this.casillas.push(new Array(tam));
		}
	}
	//feta valida
	this.marcarCasilla = function(){

	}
	//comprobar casilla
	//comprobar que no sean tres en linea
	//comprobar si son 4 en linea
	//comprobar que este dentro del tablero	
}

//clase
function Jugador(){
	//this.tipo;
	this.nombre;
	this.ip;
	this.puerto;
	this.conexion;
}

