var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 100;

var criaMopsquitoTempo = 1500;

var nivel = window.location.search;
nivel = nivel.replace("?", "");

if(nivel === "normal"){
    criaMopsquitoTempo = 1500;
}else if(nivel === "dificil"){
    criaMopsquitoTempo = 1000;
}else if (nivel === "chucknorris"){
    criaMopsquitoTempo = 750;
}

function ajusteTamanoTela(){
    altura = window.innerHeight;
    largura = window.innerWidth;
}
ajusteTamanoTela()

var cronometro = setInterval(function(){
    tempo --;
    if(tempo < 0){
        clearInterval(cronometro);
        clearInterval(clearMosquito);
        window.location.href = "vitoria.html"
    }else{
        document.getElementById("tempo-dec").innerHTML  = tempo;
    }
}, 1000)

function posRandom(){
    // remover mosquito anterior
    if(document.getElementById("mosquito")){
        document.getElementById("mosquito").remove();
        if(vidas > 3){
            window.location.href = "fim_jogo.html"
        }else{
            document.getElementById("v" + vidas).src = "res/coracao_vazio.png"
            vidas++;
        }
    }

    var posX = Math.floor(Math.random() * largura) - 90;
    var posY = Math.floor(Math.random() * altura) - 90;
    console.log(posX, posY);
    posX = posX < 0 ? 0 : posX;
    posY = posY < 0 ? 0 : posY;

    var mosquito = document.createElement("img");
    mosquito.src = "res/mosca.png";
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
    mosquito.style.left = posX + "px";
    mosquito.style.top = posY + "px";
    mosquito.style.position = "absolute";
    mosquito.id= "mosquito";
    mosquito.onclick = function(){
        this.remove();
    }

    document.body.appendChild(mosquito);
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3);
    switch(classe){
        case 0:
            return "mosquito1";
        case 1:
            return "mosquito2";
        case 2:
            return "mosquito3";
    }
}

function ladoAleatorio(){
    var lado = Math.floor(Math.random() * 2);
    switch(lado){
        case 0:
            return "ladoA";
        case 1:
            return "ladoB";  
    }
}