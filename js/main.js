
init = function() {

    

    //InserirTeste({ DataHora: new Date() });
}

$(function() {
   
    $("#btnSync").on("click", function() {
        if(navigator.onLine) {
            $.getJSON("http://worldtimeapi.org/api/timezone/America/Sao_Paulo", function(data) {
                InserirTeste(data);
                alert(data.datetime);
            });
        }
        else {
            ListarTeste(function(lista) {
                if(lista != null && lista.length > 0) {
                    var data = lista[lista.length - 1];
                    if(data != null) {
                        alert("ARMAZENADO:" + data.datetime);
                        return;
                    }
                }
                
                alert("Nenhum dado armazenado!");
            });
        }
    });

});