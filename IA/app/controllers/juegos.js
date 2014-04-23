
var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
    'partida': 'juegos/partida.html'
}

exports.index = function(req, res){
	api.getListRoundsAndMatchesList(function(list){
	 	res.render(templates.index, {
	                title: 'I want to play a game',
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
