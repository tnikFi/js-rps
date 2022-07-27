// Available choices
const CHOICES = ["rock", "paper", "scissors"]

// Win pairs
const WINS = {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper"
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
function chooseRandom() {
    console.log("a")
    let choice = CHOICES[Math.round(Math.random()*(CHOICES.length-1))];
    return choice;
}

// Play a single game
function playRound() {
    let input = prompt("Your choice: ").toLowerCase();
    if (CHOICES.indexOf(input) < 0) return;
    
    let aiChoice = chooseRandom();

    switch (getResult(input, aiChoice)) {
        case 1:
            console.log(`${input} beats ${aiChoice}. You win!`);
            break;
        case -1:
            console.log(`${aiChoice} beats ${input}. You lose!`);
            break;
        default:
            console.log("It's a tie!");
            break;
    }
}

playRound()