let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player = ''; // x ou o
let warning = ''; //'O "x" venceu!' ou 'O "y" venceu!'
let playing = false; // false = não pode jogar. Jogo finalizou.

//Adiciona evento de click para botão reset
document.querySelector('.reset').addEventListener('click', reset);

//Adiciona evento de click em cada quadrado
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Função executada quando o evento de click ocorre
function itemClick(event) {
    console.log(event.target); // Mostra as informações do item que está clicando que
    let item = event.target.getAttribute('data-item'); //pega atributo do data-item que o usuário está clicando. Ex: a1, c2, c3, etc...

    //Se o player clicar em uma caixa vazia, ele preenche essa caixa com "x" ou "o"
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

//Função executada quando o usuário reseta a partida
function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2); //Aleatório entre 0 e 1
    player = random === 0 ? 'x' : 'o'

    for (let i in square) {
        square[i] = ''; //limpa todos os quadrados
    }

    playing = true;

    renderSquare(); //Atualiza os dados atuais na tela
    renderInfo();
}

// Alterna a cada jogada entre o jogador "x" e "o"
function togglePlayer() {
    player = player === 'x' ? 'o' : 'x'
    renderInfo();
}

// Atualiza os dados na tela a cada jogada
function renderSquare() {
    for (let i in square) { // i = a1,a2,a3,b1...
        let item = document.querySelector(`div[data-item=${i}]`)

        item.innerHTML = square[i];
    }

    checkGame();
}

//Mostra as informações do player da próxima jogada e a quantidade de vitórias
function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

// Verifica a cada jogada se algum jogador ganhou, ou se deu empate, ou se o jogo ainda encontra-se não finalizado
function checkGame() {
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu!'
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu!'
        playing = false;
    } else if(isFull()){
        warning = 'Empate!'
        playing = false;
    }
}

function checkWinnerFor(player) {
    //possibilidades de vitória
    let possibility = [
        // horizontal
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        // vertical
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        //transversal
        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let i in possibility){
        //Ex: possibility[0] = [ 'a1', 'a2', 'a3' ] 
        let pArray = possibility[i].split(',');

        hasWon = pArray.every((option)=>{
            if(square[option] === player){
                return true; //retorna true apenas se todas as verificações forem verdadeiras.
                //Ex: se square['a1'] = "x" && square['a2'] = "x" && square['a3'] = "x", return true
            } else {
                return false;
            }
        })

        // Se o jogador venceu
        if(hasWon){
            return true;
        }
    }
    return false;
}

function isFull() {
    for(let i in square){
        //Não está preenchido todos os quadros
        if(square[i] === ''){
            return false
        }
    }

    return true; // Empate
}

reset(); //iniciar automaticamente