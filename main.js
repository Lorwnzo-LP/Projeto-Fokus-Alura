// botões
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.getElementById('start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarImage = document.querySelector('#start-pause img');

// imagens
const iniciarBt = document.getElementById('start-pause');
const banner = document.querySelector('.app__image');
const appTitle = document.querySelector('.app__title');

// Sons
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const playSom = new Audio('/sons/play.wav');
const pausaSom = new Audio('/sons/pause.mp3');
const beepSom = new Audio('/sons/beep.mp3');

// temporizador
const tempoNaTela = document.getElementById('timer');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
const focoTempo = 1500;
const curtoTempo = 300;
const longoTempo = 900;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = focoTempo;
    alternarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = curtoTempo;
    alternarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = longoTempo;
    alternarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alternarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto) {
        case "foco":
            appTitle.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            appTitle.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            appTitle.innerHTML = `Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }

}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        beepSom.play();
        alert('tempo finalizado');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloId){
        zerar();
        pausaSom.play();
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    playSom.play();
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarImage.setAttribute('src','/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarImage.setAttribute('src','/imagens/play_arrow.png');
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
