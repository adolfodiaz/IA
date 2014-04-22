
var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
}

exports.index = function(req, res){
	api.getListRoundsAndMatchesList(function(list){
	 	res.render(templates.index, {
	                title: 'I want to play a game',
	                elements: list
	            })
	});


}