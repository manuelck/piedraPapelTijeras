import appTemplate from './src/app/appTemplate';

// Function to initialize the game after the template is loaded
function initializeGame() {
    // Get elements and set up event listeners
    const resultDiv = document.getElementById("result");
    const playerScoreSpan = document.getElementById("player-score");
    const computerScoreSpan = document.getElementById("computer-score");
    const playButton = document.getElementById("play-button");
    const choicesContainer = document.getElementById("choices-container");
    const countdownDisplay = document.getElementById("countdown");
    const retryButton = document.getElementById("retry-button");
    const nextRoundButton = document.getElementById("next-round-button");

    // Define other game variables and functions
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

        // Reset scores and update UI
        playerScore = 0;
        computerScore = 0;
        updateScores();
        resultDiv.textContent = "";
        countdownDisplay.classList.remove("hidden");

        // Start countdown
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
        // Hide choices
        choicesContainer.classList.add("hidden");
        choicesContainer.classList.remove("flex");

        // Generate computer choice and get result
        const computerChoice = getRandomChoice();
        const result = getResult(playerChoice, computerChoice);

        // Display result and update scores
        resultDiv.textContent = result;
        resultDiv.classList.remove("hidden");
        countdownDisplay.classList.add("hidden");
        updateScores();

        // Show retry and next round buttons
        retryButton.classList.remove("hidden");
        nextRoundButton.classList.remove("hidden");

        // Hide player choices
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
            return "No se realizó ninguna selección. ¡El PC gana la ronda!";
        } else if (player === computer) {
            return "Draw!";
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            playerScore++;
            return "¡HAS GANADO LA RONDA!";
        } else {
            computerScore++;
            return "¡HAS PERDIDO LA RONDA!";
        }
    }

    function updateScores() {
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }

    function resetGame() {
        // Reset scores and UI
        playerScore = 0;
        computerScore = 0;
        updateScores();
        retryButton.classList.add("hidden");
        nextRoundButton.classList.add("hidden");
        resultDiv.textContent = "";
        resultDiv.classList.add("hidden");

        // Show player choices
        const choices = Array.from(choicesContainer.getElementsByTagName("button"));
        choices.forEach(choice => {
            choice.classList.remove("selected", "hidden");
        });

        // Clear countdown interval and hide countdown
        clearInterval(countdownInterval);
        countdownDisplay.classList.add("hidden");

        // Show play button
        playButton.classList.remove("hidden");
        choicesContainer.classList.add("hidden");
        choicesContainer.classList.remove("flex");
    }

    function startNextRound() {
      // Show player choices for next round
      choicesContainer.classList.remove("hidden");
      choicesContainer.classList.add("flex");
      retryButton.classList.add("hidden");
      nextRoundButton.classList.add("hidden");
      resultDiv.textContent = "";
      resultDiv.classList.add("hidden");
      
      // Clear previous countdown interval
      clearInterval(countdownInterval);
      
      // Reset countdown display
      countdownDisplay.classList.remove("hidden");
      countdownDisplay.textContent = "5";
      
      // Reset player choices
      const choices = Array.from(choicesContainer.getElementsByTagName("button"));
      choices.forEach(choice => {
          choice.classList.remove("selected", "hidden");
      });
  
      // Start countdown for next round
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

// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const targetDiv = document.getElementById('game');
    targetDiv.innerHTML = appTemplate;

    // Once the template is loaded, initialize the game
    initializeGame();
});
