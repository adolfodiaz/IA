
var url_base = '/juegos'
var templates = {
    'index': 'juegos/index.html',
}

exports.index = function(req, res){
 	 res.render(templates.index, {
                title: 'I want to play a game'
            })
}