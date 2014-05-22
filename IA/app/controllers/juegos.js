
var Match = require('../api/Match.js').Match;
var Board = require('../api/Board.js').Board;


var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
    'partida': 'juegos/partida.html',
    'verPartida': 'juegos/listaJugadores.html',
    'verJuegoPartida': 'juegos/listaJuegosPorJugador.html',
    'verRoundJuego' : 'juegos/listaDeRound.html',
    'verPartidaJugador': 'juegos/verPartidaJugador.html'
}


exports.match = function(req, res, next, id){
	//datos temporales de partida;
	console.log(id);
	if(matchesList[id] != null){
		req.match = matchesList[id];
		req.inicio = false;
	}
	else res.error = true;
	
	next();
}
exports.parJugador = function(req, res, next, id){
	next();
}
exports.parPartida = function(req, res, next, id){
	next();
}

exports.index = function(req, res){
	api.getListRoundsAndMatchesList(req, function(id, list){
	 	res.render(templates.index, {
	                title: 'Connect4',
	                id: id,
	                elements: list
	            })
	});
}
exports.partida = function (req, res) {
	if(res.error) {
		req.flash('error', 'Ups, no existe esta partida');
		res.redirect(url_base);
	}
	else{
		console.log("llamando a funcion de al lado xd");
		var partida=true;
		api.getIdPlayer(req, function(id) {
			nombrePlayer = getPlayerNameForID[id];
			//si es jugador 1
			if( req.match.player1Name == getPlayerNameForID[id] ){
				var partida = req.match.whoStarted;
			} //si es jugador 2
			else if(req.match.player2Name == getPlayerNameForID[id]){
				var partida = !req.match.whoStarted;
			
			//si es espectador
			//} else if(){
				
			}
			else{
				req.flash('error', 'Ups, no puedes entrar a esta partida');
				res.redirect(url_base);
			}
			res.render(templates.partida, {
					id: id,
			        title: 'Partida de '+req.match.name,
			        squares: req.match.board.squares,
			        nombre: req.match.name,
			        tamTablero: req.match.board.boardSize,
			        inicio: req.inicio,
			        partida: partida
			    });
		});
	}
}

exports.verPartida = function (req, res) {
	db.obtener_usuarios_all(function(lista){
		console.log(lista);
		res.render(templates.verPartida, {
			title: 'hola',
			elements: lista
		})
	});
	
	
}

exports.verJuegoPartida = function (req, res) {
	var split = req.url.split('/');	
	db.obtener_partidas_username(function(lista){
		res.render(templates.verJuegoPartida, {
			title: 'hola2',
			elements: lista
		})
	},split[2]);	
}

exports.verRoundJuego = function(req,res){
	console.log(3);
	var split = req.url.split('/');		
	db.obtener_rounds(function(lista){
		res.render(templates.verRoundJuego, {
			title: 'hola3',
			elements: lista[0].rounds
		})
	}, split[3])
}

exports.verPartidaJugador = function (req, res) {
	console.log(4);
	res.render(templates.verPartidaJugador, {
		title: 'hola4'
	})
	

}




