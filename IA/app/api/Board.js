//BoardSize:
//0 indica que no posee ficha
//1 indica que posee ficha color blanco o player 1
//2 indica que posee ficha color negro o player 2
function Board(){
	this.squares = new Array();
	this.boardSize; //Ancho y Alto (Width y Height)
	var crear = function(tam){
		this.boardSize = tam; //Ancho y Alto (Width y Height)
		for (var i = 0; i < tam; i++) {
			this.squares[i] = new Array(tam);
			for(var j=0; j<tam;j++);
				this.squares[i][j] = 0;
		};
	}
}

module.exports.Board = Board;
