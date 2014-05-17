function validateRules(){
	var resultadoJugada = -2;
	console.log('Resultado jugada antes de ' +resultadoJugada);
	console.log('Posicion X ' +xPos2);
	console.log('POsicion Y ' +yPos2);
	if(xPos2 >= tablero.boardSize || yPos2 >= tablero.boardSize || xPos2 < 0 || yPos2 < 0 ){
		resultadoJugada = -1; //"Jugada Invalida - Fuera del tablero";
		console.log("Jugada Invalida - Fuera del tablero");
	}else{
		if(tablero.squares[xPos2][yPos2] == 0){
			var victoria = false;
			var tresEnLinea = false;
			arribaIzquierda = 0;
			abajoDerecha = 0;
			arribaDerecha = 0;
			abajoIzquierda = 0;
			arriba = 0;
			abajo = 0;
			izquierda = 0;
			derecha = 0;
			
			/*Revisar Diagonal Descendente*/

			if(xPos2-1 >= 0 && yPos2-1 >= 0){
				arribaIzquierda++;
				if(xPos2-2 >= 0 && yPos2-2 >= 0){
					arribaIzquierda++;
					if(xPos2-3 >= 0 && yPos2-3 >= 0){
						arribaIzquierda++;
					}
				}
			}
			if(xPos2+1 < tablero.boardSize && yPos2+1 < tablero.boardSize){
				abajoDerecha++;
				if(xPos2+2 < tablero.boardSize && yPos2+2 < tablero.boardSize){
					abajoDerecha++;
					if(xPos2+3 < tablero.boardSize && yPos2+3 < tablero.boardSize){
						abajoDerecha++;
					}
				}
			}

			if(arribaIzquierda>0){
				if(tablero.squares[xPos2-1][yPos2-1]!=numJugador){
					if(abajoDerecha>0){
						if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
							
						}else if(abajoDerecha>1){
							if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(abajoDerecha>2){
									if(tablero.squares[xPos2+3][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}
				}else if(arribaIzquierda>1){
					if(tablero.squares[xPos2-2][yPos2-2]!=numJugador){
						if(abajoDerecha>0){
							if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(abajoDerecha>1){
									if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}else if(arribaIzquierda>2){
						if(tablero.squares[xPos2-3][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
							tresEnLinea = true;
							if(abajoDerecha>0){
								if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
									
								}else{
									victoria = true;
									
								}
							}
						}else{
							victoria = true;
							
						}
					}else if(abajoDerecha>0){
						if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
							
						}else{
							victoria = true;
							
						}
					}
				}else if(abajoDerecha>0){
					if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(abajoDerecha>1){
							if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}else if(abajoDerecha>0){
				if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
					
				}else if(abajoDerecha>1){
					if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(abajoDerecha>2){
							if(tablero.squares[xPos2+3][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}

			/*Revisar Diagonal Ascendente*/

			if(xPos2-1 >= 0 && yPos2+1 < tablero.boardSize){
				arribaDerecha++;
				if(xPos2-2 >= 0 && yPos2+2 < tablero.boardSize){
					arribaDerecha++;
					if(xPos2-3 >= 0 && yPos2+3 < tablero.boardSize){
						arribaDerecha++;
					}
				}
			}
			if(xPos2+1 < tablero.boardSize && yPos2-1 >= 0){
				abajoIzquierda++;
				if(xPos2+2 < tablero.boardSize && yPos2-2 >= 0){
					abajoIzquierda++;
					if(xPos2+3 < tablero.boardSize && yPos2-3 >= 0){
						abajoIzquierda++;
					}
				}
			}

			if(arribaDerecha>0){
				if(tablero.squares[xPos2-1][yPos2+1]!=numJugador){
					if(abajoIzquierda>0){
						if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
							
						}else if(abajoIzquierda>1){
							if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(abajoIzquierda>2){
									if(tablero.squares[xPos2+3][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}
				}else if(arribaDerecha>1){
					if(tablero.squares[xPos2-2][yPos2+2]!=numJugador){
						if(abajoIzquierda>0){
							if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(abajoIzquierda>1){
									if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}else if(arribaDerecha>2){
						if(tablero.squares[xPos2-3][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
							tresEnLinea = true;
							if(abajoIzquierda>0){
								if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
									
								}else{
									victoria = true;
									
								}
							}
						}else{
							victoria = true;
							
						}
					}else if(abajoIzquierda>0){
						if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
							
						}else{
							victoria = true;
							
						}
					}
				}else if(abajoIzquierda>0){
					if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(abajoIzquierda>1){
							if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}else if(abajoIzquierda>0){
				if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
					
				}else if(abajoIzquierda>1){
					if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(abajoIzquierda>2){
							if(tablero.squares[xPos2+3][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}

			/*Revisar Vertical*/

			if(xPos2-1 >= 0){
				arriba++;
				if(xPos2-2 >= 0){
					arriba++;
					if(xPos2-3 >= 0){
						arriba++;
					}
				}
			}
			if(xPos2+1 < tablero.boardSize){
				abajo++;
				if(xPos2+2 < tablero.boardSize){
					abajo++;
					if(xPos2+3 < tablero.boardSize){
						abajo++;
					}
				}
			}

			if(arriba>0){
				if(tablero.squares[xPos2-1][yPos2]!=numJugador){
					if(abajo>0){
						if(tablero.squares[xPos2+1][yPos2]!=numJugador){
							
						}else if(abajo>1){
							if(tablero.squares[xPos2+2][yPos2]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(abajo>2){
									if(tablero.squares[xPos2+3][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}
				}else if(arriba>1){
					if(tablero.squares[xPos2-2][yPos2]!=numJugador){
						if(abajo>0){
							if(tablero.squares[xPos2+1][yPos2]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(abajo>1){
									if(tablero.squares[xPos2+2][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}else if(arriba>2){
						if(tablero.squares[xPos2-3][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
							tresEnLinea = true;
							if(abajo>0){
								if(tablero.squares[xPos2+1][yPos2]!=numJugador){
									
								}else{
									victoria = true;
									
								}
							}
						}else{
							victoria = true;
							
						}
					}else if(abajo>0){
						if(tablero.squares[xPos2+1][yPos2]!=numJugador){
							
						}else{
							victoria = true;
							
						}
					}
				}else if(abajo>0){
					if(tablero.squares[xPos2+1][yPos2]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(abajo>1){
							if(tablero.squares[xPos2+2][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}else if(abajo>0){
				if(tablero.squares[xPos2+1][yPos2]!=numJugador){
					
				}else if(abajo>1){
					if(tablero.squares[xPos2+2][yPos2]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(abajo>2){
							if(tablero.squares[xPos2+3][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}

			/*Revisar Horizontal*/

			if(yPos2-1 >= 0){
				izquierda++;
				if(yPos2-2 >= 0){
					izquierda++;
					if(yPos2-3 >= 0){
						izquierda++;
					}
				}
			}
			if(yPos2+1 < tablero.boardSize){
				derecha++;
				if(yPos2+2 < tablero.boardSize){
					derecha++;
					if(yPos2+3 < tablero.boardSize){
						derecha++;
					}
				}
			}

			if(izquierda>0){
				if(tablero.squares[xPos2][yPos2-1]!=numJugador){
					if(derecha>0){
						if(tablero.squares[xPos2][yPos2+1]!=numJugador){
							
						}else if(derecha>1){
							if(tablero.squares[xPos2][yPos2+2]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(derecha>2){
									if(tablero.squares[xPos2][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}
				}else if(izquierda>1){
					if(tablero.squares[xPos2][yPos2-2]!=numJugador){
						if(derecha>0){
							if(tablero.squares[xPos2][yPos2+1]!=numJugador){
								
							}else{
								tresEnLinea = true;
								if(derecha>1){
									if(tablero.squares[xPos2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
										
									}else{
										victoria = true;
										
									}
								}
							}
						}
					}else if(izquierda>2){
						if(tablero.squares[xPos2][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
							tresEnLinea = true;
							if(derecha>0){
								if(tablero.squares[xPos2][yPos2+1]!=numJugador){
									
								}else{
									victoria = true;
									
								}
							}
						}else{
							victoria = true;
							
						}
					}else if(derecha>0){
						if(tablero.squares[xPos2][yPos2+1]!=numJugador){
							
						}else{
							victoria = true;
							
						}
					}
				}else if(derecha>0){
					if(tablero.squares[xPos2][yPos2+1]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(derecha>1){
							if(tablero.squares[xPos2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}else if(derecha>0){
				if(tablero.squares[xPos2][yPos2+1]!=numJugador){
					
				}else if(derecha>1){
					if(tablero.squares[xPos2][yPos2+2]!=numJugador){
						
					}else{
						tresEnLinea = true;
						if(derecha>2){
							if(tablero.squares[xPos2][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
								
							}else{
								victoria = true;
								
							}
						}
					}
				}
			}

			if(victoria == true) resultadoJugada = 1; //"Hay 4 en fila";
			else{
				if(tresEnLinea == true) resultadoJugada = 2; //"Hay 3 en fila";
				else resultadoJugada = 0 //"Se sigue el juego";
			}
		}else{
			resultadoJugada = -1 ;
			console.log("Jugada Invalida - Casillero ocupado");//"Jugada Invalida - Casillero ocupado";
		}
	}
}