
var Match = require('../api/Match.js').Match;
var Board = require('../api/Board.js').Board;

var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
    'partida': 'juegos/partida.html',
}


exports.match = function(req, res, next, id){
	//datos temporales de partida;
	if(matchesList[id] != null){
		req.match = matchesList[id];
		req.inicio = false;
	}
	else res.error = true;
	
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
