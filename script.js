console.log("Welcome to Tic Tac Toe");
let turnMusic = new Audio('assets/synth.wav');
let gameOver = new Audio('assets/turn.wav');
let gameWin = new Audio('assets/highScore.wav');
let turn = "X";
let isgameover = false;

//Function to change turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

//Function to check for a win
const checkWin = () => {
    let boxchar = document.getElementsByClassName('boxtext');
    let winlines = document.getElementsByClassName('line');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(e => {
        if ((boxchar[e[0]].innerHTML === boxchar[e[1]].innerHTML) && (boxchar[e[2]].innerHTML === boxchar[e[1]].innerHTML) && (boxchar[e[0]].innerHTML !== "")) {
            if (e === wins[0] || e === wins[1] || e === wins[2]) {
                console.log("horizontal line");
                winlines[e[0]].style.width = "10vw";
                winlines[e[1]].style.width = "10vw";
                winlines[e[2]].style.width = "10vw";
                winlines[e[0]].style.transform = "rotate(0deg)";
                winlines[e[1]].style.transform = "rotate(0deg)";
                winlines[e[2]].style.transform = "rotate(0deg)";
            }
            else if (e === wins[3] || e === wins[4] || e === wins[5]) {
                console.log("vertical line");
                winlines[e[0]].style.width = "10vw";
                winlines[e[1]].style.width = "10vw";
                winlines[e[2]].style.width = "10vw";
                winlines[e[0]].style.transform = "rotate(90deg)";
                winlines[e[1]].style.transform = "rotate(90deg)";
                winlines[e[2]].style.transform = "rotate(90deg)";
            }
            else {
                console.log("diagonal line");
                winlines[e[0]].style.width = "14vw";
                winlines[e[1]].style.width = "14vw";
                winlines[e[2]].style.width = "14vw";
                if (e === wins[6]) {
                    winlines[e[0]].style.transform = "rotate(45deg)";
                    winlines[e[1]].style.transform = "rotate(45deg)";
                    winlines[e[2]].style.transform = "rotate(45deg)";
                }
                if (e === wins[7]) {
                    winlines[e[0]].style.transform = "rotate(-45deg)";
                    winlines[e[1]].style.transform = "rotate(-45deg)";
                    winlines[e[2]].style.transform = "rotate(-45deg)";
                }
            }
            isgameover = true;
            document.querySelector('#info').innerHTML = boxchar[e[0]].innerHTML + " Won!";
            gameWin.play();
        }
    })
}

//Function for reset
const gameReset = () => {
    let boxes = document.getElementsByClassName('boxtext');
    let strike = document.getElementsByClassName('line');
    Array.from(strike).forEach(element => {
        element.style.width = "0px";
    })
    Array.from(boxes).forEach(element => {
        element.innerText = '';
    })
    turn = "X";
    document.getElementById('info').innerHTML = "Turn for " + turn;
    isgameover = false;
}

// Main logic starts here...
let boxes = document.getElementsByClassName('box');
let resetbtn = document.getElementById('reset');
resetbtn.addEventListener('click', () => {
    gameReset();
});

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', (e) => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turnMusic.play();
            turn = changeTurn();
            checkWin();
            if (!isgameover) {
                document.getElementById('info').innerHTML = "Turn for " + turn;
            }
        }
    })
});