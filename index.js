console.log("JS Loaded!");

/*
TODO:
Game state logic
Complete click logic
Ending logic and reset option (simple page reload?)

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

function initializeGame(){
    const playerOneName = document.getElementById("playerOneInput").value;
    const playerTwoName = document.getElementById("playerTwoInput").value;
    const numberOfCards = parseInt(document.getElementById("level").value);
    console.log(numberOfCards);
    if (validateInput(playerOneName, playerTwoName, numberOfCards)){
        inputUser (playerOneName, playerTwoName);
        updateScore();
        placeBoard(numberOfCards);
    }
}

function inputUser(playerOneName, playerTwoName){ 
    document.getElementById("playerOneName").innerHTML = playerOneName;
    document.getElementById("playerTwoName").innerHTML = playerTwoName;
    gameState.playerOneName = playerOneName;
    gameState.playerTwoName = playerTwoName;
}

function updateScore (){
    document.getElementById("playerOneScore").innerHTML = gameState.playerOneScore;
    document.getElementById("playerTwoScore").innerHTML = gameState.playerTwoScore;
}


function validateInput(playerOneName, playerTwoName, numberOfCards){
    if (playerOneName.length < 3 || playerTwoName.length < 3){
        alert("Player names must be at least three characters");
        return (false);
    }
    if (!numberOfCards){
        alert("Select how many cards to play with");
        return (false);
    }
    if (numberOfCards < 12 || numberOfCards > 48 || numberOfCards % 2 !== 0){
        alert("Not a valid number of cards");
        return (false);
    }
    return (true);
}

function placeBoard(numberOfCards){
    const boardOrder = randomOrderArray(numberOfCards);
    const parent = document.getElementById("board");
    console.log(boardOrder);
    boardOrder.forEach(pairValue => {
        const newDiv = document.createElement("div");
        newDiv.className = "card";
        newDiv.dataset.value = pairValue;
        newDiv.dataset.faceUp = 0;
        newDiv.dataset.taken = 0;
        newDiv.addEventListener("click", handleCardClick);
        parent.appendChild(newDiv);
    });
}

function randomOrderArray(numberOfCards){
    const pairsArray = [];
    const randomArray = [];
    for (let i = 0; i < numberOfCards / 2; i++)
        pairsArray.push(i, i);
    for (let i = 0; i < numberOfCards; i++){
        const randomIndex = Math.floor(Math.random() * pairsArray.length);
        randomArray.push(pairsArray[randomIndex]);
        pairsArray.splice(randomIndex, 1);
    }
    return (randomArray);
}

function handleCardClick(event){
    const currentCard = event.target;
    if (currentCard.dataset.faceUp === "0"){
        gameState.currentCards.push(currentCard.dataset.value);
        currentCard.innerHTML = currentCard.dataset.value;
        currentCard.dataset.faceUp = 1;
        if (gameState.currentCards.length === 2) {
            setTimeout(checkOutcome, 1500);
        }
        console.log(gameState);
    }
}

function checkOutcome(){
    console.log("Decide what should happen");
    if (gameState.currentCards[0] === gameState.currentCards[1]){
        if (gameState.playerOneTurn)
            gameState.playerOneScore++;
        else
            gameState.playerTwoScore++;
        removeCardVisibility();
    }
    else {
        gameState.playerOneTurn = !gameState.playerOneTurn;
        revertCardFaces();
    }
    gameState.currentCards = [];
}

function removeCardVisibility(){
    const cardsArray = document.getElementsByClassName("card");
    for (let card of cardsArray){
        if (card.dataset.faceUp === "1"){
            card.dataset.faceUp = 0;
            card.style.visibility = "hidden";
        }
    };
}

function revertCardFaces(){
    const cardsArray = document.getElementsByClassName("card");
    console.log(cardsArray);
    for (let card of cardsArray){
        if (card.dataset.faceUp === "1"){
            card.innerHTML = "";
            card.dataset.faceUp = 0;
        }
    };
}

function resetGame(){
    console.log("Should be reset");
    window.location.reload();
}