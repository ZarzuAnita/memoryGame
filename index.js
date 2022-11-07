console.log("JS Loaded!");

/*
TODO:
añadir objeto turno player (Tener atado a header?)
Seleccionar mejor font para las cartas ?
animación cartas

*/

const gameState = {
    playerOneName: "",
    playerTwoName: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    maxPoints: 0,
    playerOneTurn: true,
    currentCards: []
};

function initializeGame() {
    const playerOneName = document.getElementById("playerOneInput").value;
    const playerTwoName = document.getElementById("playerTwoInput").value;
    const numberOfCards = parseInt(document.getElementById("level").value);
    if (validateInput(playerOneName, playerTwoName, numberOfCards)) {
        inputUser(playerOneName, playerTwoName);
        gameState.maxPoints = numberOfCards / 2;
        updateScore();
        placeBoard(numberOfCards);
        document.getElementById("userForm").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

    }
}

function inputUser(playerOneName, playerTwoName) {
    document.getElementById("playerOneName").innerHTML = playerOneName;
    document.getElementById("playerTwoName").innerHTML = playerTwoName;
    gameState.playerOneName = playerOneName;
    gameState.playerTwoName = playerTwoName;
}

function updateScore() {
    document.getElementById("playerOneScore").innerHTML = gameState.playerOneScore;
    document.getElementById("playerTwoScore").innerHTML = gameState.playerTwoScore;
}

function validateInput(playerOneName, playerTwoName, numberOfCards) {
    if (playerOneName.length < 3 || playerTwoName.length < 3) {
        alert("Player names must be at least three characters");
        return (false);
    }
    if (!numberOfCards) {
        alert("Select how many cards to play with");
        return (false);
    }
    if (numberOfCards < 12 || numberOfCards > 48 || numberOfCards % 2 !== 0) {
        alert("Not a valid number of cards");
        return (false);
    }
    return (true);
}

function placeBoard(numberOfCards) {
    const boardOrder = randomOrderArray(numberOfCards);
    const parent = document.getElementById("board");
    console.log(boardOrder);
    boardOrder.forEach(pairValue => {
        const newDiv = document.createElement("div");
        const newP = document.createElement("p");
        newDiv.className = "card";
        newDiv.dataset.value = pairValue;
        newDiv.dataset.faceUp = 0;
        newDiv.addEventListener("click", handleCardClick);
        newDiv.appendChild(newP);
        parent.appendChild(newDiv);
    });
}

function randomOrderArray(numberOfCards) {
    const randomArray = [];
    for (let i = 0; i < numberOfCards / 2; i++)
        randomArray.push(i, i);
    for (let i = randomArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [randomArray[i], randomArray[randomIndex]] = [randomArray[randomIndex], randomArray[i]];
    }
    return (randomArray);
}

function handleCardClick(event) {
    const currentCard = event.target;
    if (currentCard.dataset.faceUp === "0" && gameState.currentCards.length < 2) {
        gameState.currentCards.push(currentCard.dataset.value);
        currentCard.children[0].innerHTML = currentCard.dataset.value;
        currentCard.dataset.faceUp = 1;
        if (gameState.currentCards.length === 2)
            setTimeout(checkOutcome, 1500);
    }
}

function checkOutcome() {
    if (gameState.currentCards[0] === gameState.currentCards[1]) {
        gameState.playerOneTurn ? gameState.playerOneScore++ : gameState.playerTwoScore++;
        removeCardVisibility();
        updateScore();
    }
    else {
        gameState.playerOneTurn = !gameState.playerOneTurn;
        revertCardFaces();
    }
    gameState.currentCards = [];
    if (gameState.playerOneScore + gameState.playerTwoScore === gameState.maxPoints)
        endGame();
}

function endGame() {
    if (gameState.playerOneScore === gameState.playerTwoScore) {
        document.getElementById("winner").innerHTML = "Empate";
    }
    else {
        const finalResult = gameState.playerOneScore > gameState.playerTwoScore ? gameState.playerOneName : gameState.playerTwoName;
        document.getElementById("winner").innerHTML = `${finalResult} ha ganado la partida`;
    }
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
}

function removeCardVisibility() {
    const cardsArray = document.getElementsByClassName("card");
    for (let card of cardsArray) {
        if (card.dataset.faceUp === "1") {
            card.dataset.faceUp = 0;
            card.style.visibility = "hidden";
        }
    }
}

function revertCardFaces() {
    const cardsArray = document.getElementsByClassName("card");
    for (let card of cardsArray) {
        if (card.dataset.faceUp === "1") {
            card.children[0].innerHTML = "";
            card.dataset.faceUp = 0;
        }
    }
}

function resetGame() {
    console.log("Should be reset");
    window.location.reload();
}