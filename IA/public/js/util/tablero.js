function Tablero(){
  this.numero;
              this.crear_tablero_html = function(divPosicion ,numero , squares ) {
                this.numero = numero;
               // Crea un elemento <table> y un elemento <tbody>
                  var tabla   = document.createElement("table");
                  tabla.id = "chess_board";
                  tabla.style.margin = '0px auto';
                  var tblBody = document.createElement("tbody");
                 //Creamos las filas
                  k = 0;
                  for (var i = 0; i < numero; i++) {
                    var hilera = document.createElement("tr");
                    //Creamos las columnas
                    for (var j = 0; j < numero; j++) {
                      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                      // texto sea el contenido de <td>, ubica el elemento <td> al final
                      // de la hilera de la tabla
                      var celda = document.createElement("td");
                      celda.id = "tablero_id_"+i+j;

                      if(squares[k]==1){
                        var div = document.createElement("div");
                        div.className = "circulo_blanco";
                        celda.appendChild(div);
                      }
                      else if(squares[k]==2){
                        var div = document.createElement("div");
                        div.className = "circulo_negro";
                        celda.appendChild(div);
                      }
                      else{
                        celda.setAttribute('onclick',"jugarFicha("+i+","+j+");");
                      }
                      k++;
                      hilera.appendChild(celda);
                    }
                 
                    // agrega la hilera al final de la tabla (al final del elemento tblbody)
                    tblBody.appendChild(hilera);
                  }
                 
                  // posiciona el <tbody> debajo del elemento <table>
                  tabla.appendChild(tblBody);
                  // appends <table> into <body>

                  document.getElementById(divPosicion).innerHTML = " ";
                  document.getElementById(divPosicion).appendChild(tabla);
                  
                  // modifica el atributo "border" de la tabla y lo fija a "2";
                 }
}