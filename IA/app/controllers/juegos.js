
var Match = require('../api/Match.js').Match;

var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
    'partida': 'juegos/partida.html'
}

exports.match = function(req, res, next, id){
	//datos temporales de partida;
	
	var partidaNoReal = new Match();
	partidaNoReal.name=id;
	partidaNoReal.board.crear(5);
    req.match = partidaNoReal;
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
	console.log('entro a partida');
	console.log(req.match);

    res.render(templates.partida, {
        title: 'Partida de '+req.match.name,
        nombre: req.match.name,
        tamTablero: req.match.board.boardSize
    })
}
