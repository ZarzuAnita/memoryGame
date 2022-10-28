console.log("JS Loaded!");

function initializeGame(){
    //validate input: two names and a selection
    //how to retrieve value from radio buttons?
    const numberOfCards = document.querySelector("input[name=level]:checked").value;
    console.log(numberOfCards);
    placeBoard(numberOfCards);
}

function placeBoard(numberOfCards){
    const boardOrder = randomOrderArray(numberOfCards);
    const parent = document.getElementById("board");
    console.log(boardOrder);
    boardOrder.forEach(pairValue => {
        const newDiv = document.createElement("div");
        newDiv.className = "card";
        newDiv.dataset.value = pairValue;
        newDiv.addEventListener("click", handleCardClick);
        parent.appendChild(newDiv);
    });
}

function randomOrderArray(numberOfCards){
    const pairsArray = [numberOfCards];
    const randomArray = [numberOfCards];
    for (let i = 0; i < numberOfCards / 2; i++){
        pairsArray[i * 2] = i;
        pairsArray[i * 2 + 1] = i;
    }
    for (let i = 0; i < numberOfCards; i++){
        const randomIndex = Math.floor(Math.random() * pairsArray.length);
        randomArray[i] = pairsArray[randomIndex];
        pairsArray.splice(randomIndex, 1);
    }
    return (randomArray);
}

function handleCardClick(event){
    const currentCard = event.target;
    console.log(currentCard);
    currentCard.innerHTML = currentCard.dataset.value;
}