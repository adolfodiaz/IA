function Cronometro(lugarCarga, inicio){
  var cronometro = this;
  cronometro.interval = 0;
  this.upd = function(){
    var secs = cronometro.interval/100;
    var milis = cronometro.interval%100;
    cronometro.lugarCarga.innerHTML = Math.floor(secs)+":"+milis;
  }
  this.paso = function(){
    cronometro.interval = cronometro.interval + 1;
    cronometro.upd();
  }
  this.iniciar = function(){
    cronometro.lugarCarga = document.getElementById('reloj');
    cronometro.id_intervalo = setInterval(cronometro.paso,1000);
  };
  this.detener = function(){
    clearInterval(cronometro.id_intervalo);
  };
  this.reiniciar = function(){
    cronometro.interval = 0;
    cronometro.lugarCarga.innerHTML = "0:0";a
  };
}
