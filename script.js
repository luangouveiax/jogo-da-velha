// Dados inicias
let quadro = {
    a1: '', a2: '', a3: '',
    b1: 'x', b2: '', b3: '',
    c1: '', c2: 'o', c3: '',
};
let vez = '';
let aviso = '';
let jogando = false;

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Funções
function itemClick(e){
    let item = e.target.getAttribute('data-item');
    if(jogando && quadro[item] === ''){
        quadro[item] = vez;
        renderQuadro();
        alternarVez();
    }
}

function reset(){
    aviso = '';

    let random = Math.floor(Math.random() * 2);
    vez = (random === 0) ? 'x' : 'o';

    for(let i in quadro){
        quadro[i] = '';
    }

    jogando = true;

    renderQuadro();
    renderInfo();
}

function renderQuadro(){
    for(let i in quadro){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = quadro[i];
    }

    checarJogo();
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = aviso;
}

function alternarVez(){
    vez = (vez === 'x') ? 'o' : 'x';
    renderInfo();
}

function checarJogo(){
    if(checarVencedor('x')){
        aviso = 'O "x" venceu';
        jogando = false;
    }else if(checarVencedor('o')){
        aviso = 'O "o" venceu';
        jogando = false;
    }else if(empate()){
        aviso = 'Deu empate';
        jogando = false;
    }
}

function checarVencedor(vez){
    let possibilidades = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in possibilidades){
        let pArray = possibilidades[w].split(','); // a1, a2, a3
        let venceu = pArray.every((option)=>{
            if(quadro[option] === vez){
                return true;
            }else{
                return false;
            }
        });
        if(venceu){
            return true;
        }
    }

    return false;
}

function empate(){
    for(let i in quadro){
        if(quadro[i] === ''){
            return false;
        }
    }

    return true;
}