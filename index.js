// TODO: forbid player 1 from clicking while it's computer's turn

var isComputerTurn = false;
var isCircle = true;
var variant = "";
var fields = document.querySelectorAll(".field");
var emptyFields = 9;

var gameOverEvent = new Event("gameOver");
document.addEventListener("gameOver", handleGameOver);

document.querySelector(".rematch").addEventListener("click", function() {
    location.reload();
});

for (var i = 0; i < document.querySelectorAll(".buttons .play").length; i++) {
    document.querySelectorAll(".buttons .play")[i].addEventListener("click", function(event) {
        for (var i = 0; i < document.querySelectorAll(".buttons .play").length; i++) {
            document.querySelectorAll(".buttons .play")[i].style.display = "none";
        }
        document.querySelector(".board").style.display = "grid";
        if (event.target.classList.contains("player-vs-player")) {
            variant = "player-vs-player";
        } else {
            variant = "player-vs-ai";
        }
        gameStart();
    });
}

function gameStart() {
    document.querySelector("h1").innerHTML = "Player 1";
    for (var i = 0; i < document.querySelectorAll(".field").length; i++) {
        document.querySelectorAll(".field")[i].addEventListener("click", function() {
            if (this.innerHTML === "") {
                emptyFields--;
                if (isCircle) {
                    this.innerHTML = "O";
                } else {
                    this.innerHTML = "X";
                }
                isCircle = !isCircle;
                if (variant === "player-vs-player") {
                    document.querySelector("h1").innerHTML = isCircle ? "Player 1" : "Player 2";
                } else {
                    document.querySelector("h1").innerHTML = isCircle ? "Player 1" : "Computer";
                    isComputerTurn = !isCircle;
                    if (isComputerTurn) {
                        setTimeout(handleComputerTurn, 500);
                    }
                }
                if (emptyFields !== 0) {
                    setTimeout(checkGameOver, 500);
                } else {
                    checkGameOver();
                }
            }
        });
    }
}

function handleComputerTurn() {
    document.querySelector("h1").innerHTML = !isCircle ? "Player 1" : "Computer";
    do {
        var randomField = Math.floor(Math.random() * 9);
    } while (fields[randomField].innerHTML !== "")
    fields[randomField].innerHTML = "X";
    emptyFields--;
    isCircle = !isCircle;
}

function checkGameOver() {
    if ((fields[0].innerHTML === fields[1].innerHTML && fields[1].innerHTML === fields[2].innerHTML && fields[0].innerHTML !== "") || 
        (fields[3].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[5].innerHTML && fields[3].innerHTML !== "") ||
        (fields[6].innerHTML === fields[7].innerHTML && fields[7].innerHTML === fields[8].innerHTML && fields[6].innerHTML !== "") ||
        
        (fields[0].innerHTML === fields[3].innerHTML && fields[3].innerHTML === fields[6].innerHTML && fields[0].innerHTML !== "") || 
        (fields[1].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[7].innerHTML && fields[1].innerHTML !== "") ||
        (fields[2].innerHTML === fields[5].innerHTML && fields[5].innerHTML === fields[8].innerHTML && fields[2].innerHTML !== "") ||
        
        (fields[0].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[8].innerHTML && fields[0].innerHTML !== "") || 
        (fields[2].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[6].innerHTML && fields[2].innerHTML !== "")) {

        document.dispatchEvent(gameOverEvent);
    }
    if (emptyFields === 0) {
        document.dispatchEvent(gameOverEvent);
    }
}

function handleGameOver() {
    if (emptyFields !== 0) {
        if (variant === "player-vs-player") {
            var winner = !isCircle ? "Player 1" : "Player 2";
        } else {
            var winner = isCircle ? "Player 1" : "Computer";
        }
        document.querySelector(".board").style.display = "none";
        document.querySelector("h1").innerHTML = "The winner is " + winner + "!";
        document.querySelector(".rematch").style.display = "block";
        document.removeEventListener("gameOver", handleGameOver);
    } else {
        document.querySelector(".board").style.display = "none";
        document.querySelector("h1").innerHTML = "Draw!";
        document.querySelector(".rematch").style.display = "block";
        document.removeEventListener("gameOver", handleGameOver);
    }
}