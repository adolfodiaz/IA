
var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
    'partida': 'juegos/partida.html'
}

exports.index = function(req, res){
	api.getListRoundsAndMatchesList(req, function(id, list){
	 	res.render(templates.index, {
	                title: 'I want to play a game',
	                id: id,
	                elements: list
	            })
	});
}
exports.partida = function (req, res) {
	console.log(req.partida_nombre);
    res.render(templates.partida, {
        title: 'Jugar',
        nombre: req.partida_nombre
    })
}
