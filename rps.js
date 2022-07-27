// Available choices
const CHOICES = ["rock", "paper", "scissors"]

// Win pairs
const WINS = {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper"
}

// Configuration
const ROUNDS = 5;

// Variables for tracking the game progress
let currentRound = 1;
let playerScore = 0;
let aiScore = 0;

// Find the necessary elements
const statusDiv = document.querySelector("div.status");
const scoreContainer = document.querySelector("div.score-container");
const playerScoreDiv = document.querySelector("div.player-score");
const aiScoreDiv = document.querySelector("div.ai-score")
const buttons = document.querySelectorAll("button.game-button");
const scoreDivs = document.querySelectorAll(".score-container>div")

// Update the innerText of an element and highlight it
function updateText(element, value, highlight = true) {
    element.innerText = value;
    if (highlight) {
        element.classList.add("text-highlight");
    }
}

// Evaluate result
// Returns 1 if player wins, 0 if tie, -1 if AI wins
function getResult(playerChoice, aiChoice) {
    let score = 0;
    
    switch (aiChoice) {
        case WINS[playerChoice]:
            score = 1;
            break;
        case playerChoice:
            break;
        default:
            score = -1;
            break;
    }

    return score
}

// Pick a random option
const chooseRandom = () => CHOICES[Math.round(Math.random()*(CHOICES.length-1))];

// End and reset the game
function restart() {
    currentRound = null;
    scoreContainer.classList.add("idle");
    buttons.forEach(button => button.classList.add("idle"));
    if (playerScore > aiScore) {
        updateText(statusDiv, "You won!");
    } else if (aiScore > playerScore) {
        updateText(statusDiv, "You lost!");
    } else {
        updateText(statusDiv, "It's a tie!");
    }
    setTimeout(() => {
        scoreContainer.classList.remove("idle");
        buttons.forEach(button => button.classList.remove("idle"));
        playerScore = 0;
        aiScore = 0;
        updateText(playerScoreDiv, playerScore);
        updateText(aiScoreDiv, aiScore);
        currentRound = 1;
        updateText(statusDiv, `Round ${currentRound}`)
    }, 5000);
}

// Play a single game
function playRound(choice) {
    if (CHOICES.indexOf(choice) < 0) throw Error("Invalid choice");
    
    let aiChoice = chooseRandom();
    let result = getResult(choice, aiChoice);

    switch (result) {
        case 1:
            playerScore++;
            updateText(playerScoreDiv, playerScore);
            break;
        case -1:
            aiScore++;
            updateText(aiScoreDiv, aiScore);
            break;
        default:
            updateText(playerScoreDiv, playerScore);
            updateText(aiScoreDiv, aiScore);
            break;
    }

    if (currentRound >= ROUNDS) {
        restart();
    } else {
        currentRound++;
        updateText(statusDiv, `Round ${currentRound}`)
    }
}

// Handle button click
function handleClick(e) {
    if (currentRound == null) return;
    let choice = this.getAttribute("data-choice");
    this.classList.add("highlight");
    playRound(choice);
}

// Handle transition end for momentary highlight effects
function reverseHighlight(e) {
    if (this.classList.contains("highlight")) {
        this.classList.remove("highlight");
    }
    if (this.classList.contains("text-highlight")) {
        this.classList.remove("text-highlight");
    }
}

buttons.forEach(button => button.addEventListener("click", handleClick));
buttons.forEach(button => button.addEventListener("transitionend", reverseHighlight));
scoreDivs.forEach(div => div.addEventListener("transitionend", reverseHighlight));
statusDiv.addEventListener("transitionend", reverseHighlight);