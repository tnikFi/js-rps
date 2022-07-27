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
const chooseRandom = () => CHOICES[Math.round(Math.random()*(CHOICES.length-1))];

// Play a single game
function playRound() {
    let input = prompt("Your choice: ").toLowerCase();
    if (CHOICES.indexOf(input) < 0) return;
    
    let aiChoice = chooseRandom();
    let result = getResult(input, aiChoice);

    switch (result) {
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

    return result;
}

// Play multiple rounds
function playGame(rounds) {
    let playerScore = 0;
    let aiScore = 0;

    for (let i = 0; i < rounds; i++) {
        console.log(`Round ${i+1}/${rounds}`);
        let result = playRound();
        switch (result) {
            case 1:
                playerScore++;
                break;
            case -1:
                aiScore++;
                break;
        }
    }

    console.log(`Final score: ${playerScore} - ${aiScore}`);

    if (playerScore > aiScore) {
        console.log("You won!");
    } else if (playerScore < aiScore) {
        console.log("You lost!");
    } else {
        console.log("It's a tie!");
    }
}

playGame(5);