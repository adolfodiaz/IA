var Jugador = require('./Jugador.js');

function Match(){
	this.jugador1 = new Jugador();
	this.jugador2 = new Jugador();
	this.reglas = new Reglas();
	this.espectadores = new Array();
	this.tablero = new Tablero();
	this.horaInicio;
	this.quienPartio;
}