import appTemplate from './src/app/appTemplate';

function initializeGame() {
    const resultDiv = document.getElementById("result");
    const playerScoreSpan = document.getElementById("player-score");
    const computerScoreSpan = document.getElementById("computer-score");
    const playButton = document.getElementById("play-button");
    const choicesContainer = document.getElementById("choices-container");
    const countdownDisplay = document.getElementById("countdown");
    const retryButton = document.getElementById("retry-button");
    const nextRoundButton = document.getElementById("next-round-button");

    let playerScore = 0;
    let computerScore = 0;
    let countdownInterval;
    let playerChoice;

    playButton.addEventListener("click", startGame);
    retryButton.addEventListener("click", resetGame);
    nextRoundButton.addEventListener("click", startNextRound);
    choicesContainer.addEventListener("click", handleChoice);

    function startGame() {
        playButton.classList.add("hidden");
        choicesContainer.classList.remove("hidden");
        choicesContainer.classList.add("flex");

        playerScore = 0;
        computerScore = 0;
        updateScores();
        resultDiv.textContent = "";
        countdownDisplay.classList.remove("hidden");

        startCountdown(5);
    }

    function handleChoice(event) {
        if (event.target.tagName === "BUTTON") {
            playerChoice = event.target.id;
            const choices = Array.from(choicesContainer.getElementsByTagName("button"));
            choices.forEach(choice => {
                choice.classList.remove("selected");
            });
            event.target.classList.add("selected");
        }
    }

    function endGame() {
        choicesContainer.classList.add("hidden");
        choicesContainer.classList.remove("flex");

        const computerChoice = getRandomChoice();
        const result = getResult(playerChoice, computerChoice);

        resultDiv.textContent = result;
        resultDiv.classList.remove("hidden");
        countdownDisplay.classList.add("hidden");
        updateScores();

        retryButton.classList.remove("hidden");
        nextRoundButton.classList.remove("hidden");

        const choices = Array.from(choicesContainer.getElementsByTagName("button"));
        choices.forEach(choice => {
            choice.classList.add("hidden");
        });
    }

    function getRandomChoice() {
        const choices = ["rock", "paper", "scissors"];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function getResult(player, computer) {
        if (!player) {
            return "No selection. PC wins the round!";
        } else if (player === computer) {
            return "Draw!";
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            playerScore++;
            return "You win the round!";
        } else {
            computerScore++;
            return "You lose the round!";
        }
    }

    function updateScores() {
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScores();
        retryButton.classList.add("hidden");
        nextRoundButton.classList.add("hidden");
        resultDiv.textContent = "";
        resultDiv.classList.add("hidden");

        const choices = Array.from(choicesContainer.getElementsByTagName("button"));
        choices.forEach(choice => {
            choice.classList.remove("selected", "hidden");
        });

        clearInterval(countdownInterval);
        countdownDisplay.classList.add("hidden");

        playButton.classList.remove("hidden");
        choicesContainer.classList.add("hidden");
        choicesContainer.classList.remove("flex");
    }

    function startNextRound() {
        choicesContainer.classList.remove("hidden");
        choicesContainer.classList.add("flex");
        retryButton.classList.add("hidden");
        nextRoundButton.classList.add("hidden");
        resultDiv.textContent = "";
        resultDiv.classList.add("hidden");

        clearInterval(countdownInterval);
        countdownDisplay.classList.remove("hidden");
        countdownDisplay.textContent = "5";

        const choices = Array.from(choicesContainer.getElementsByTagName("button"));
        choices.forEach(choice => {
            choice.classList.remove("selected", "hidden");
        });

        startCountdown(5);
    }

    function startCountdown(seconds) {
        countdownDisplay.textContent = seconds;
        let countdown = seconds;
        countdownInterval = setInterval(() => {
            countdown--;
            countdownDisplay.textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                endGame();
            }
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const targetDiv = document.getElementById('game');
    targetDiv.innerHTML = appTemplate;

    initializeGame();
});
