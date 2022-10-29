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
    playerOneTurn: true,
    maxPoints: 0
};

function initializeGame(){
    const playerOneName = document.getElementById("playerOneInput").value;
    const playerTwoName = document.getElementById("playerTwoInput").value;
    const numberOfCards = parseInt(document.getElementById("level").value);
    console.log(numberOfCards);
    if (validateInput(playerOneName, playerTwoName, numberOfCards))
        placeBoard(numberOfCards);
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
    console.log(currentCard);
    if (currentCard.dataset.faceUp == 0){
        currentCard.innerHTML = currentCard.dataset.value;
        currentCard.dataset.faceUp = 1;
    }
    else {
        currentCard.innerHTML = "";
        currentCard.dataset.faceUp = 0;
    }
}

function resetGame(){
    console.log("Should be reset");
    window.location.reload();
}