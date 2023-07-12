window.addEventListener("contextmenu", (e) => e.preventDefault());

// Global variables
let finished = false;

async function getWordData() {
  try {
    const response = await fetch("/rand_data/random.json");
    const data = await response.json();

    if (!response.ok) return;
    typimonCode(data);
  } catch (err) {
    console.log(err);
  }
}

// Global time
let secondsCounter = 0;
let minutesCounter = 0;
let timeManagerInterval;

function timeManager() {
  const secDisplay = $("#sec__display");
  const minDisplay = $("#min__display");

  // Bug Here: The time still counts even when the challenge ends: FIXED!
  if (!finished) {
    timeManagerInterval = setInterval(() => {
      if (secondsCounter < 10) {
        secDisplay.text(`0${secondsCounter}`);
      } else {
        secDisplay.text(`${secondsCounter}`);
      }

      if (secondsCounter >= 59) {
        secondsCounter = -1;

        // Minute handling section
        minutesCounter++;
        if (minutesCounter < 10) {
          minDisplay.text(`0${minutesCounter}`);
        } else {
          minDisplay.text(`${minutesCounter}`);
        }
      }

      secondsCounter++;
    }, 1000);
  } else {
    clearInterval(timeManagerInterval);
  }
}

function typimonCode(data) {
  let randWordDisplay = $("#randword__displayer");

  randomChooser = Math.floor(Math.random() * data.length);
  let generatedWord = data[randomChooser].word;

  randWordDisplay.text(generatedWord);

  // $("#refresh__btn").on("click", () => {
  //   randWordDisplay.text(generatedWord);
  // });

  let gottenWord = "";
  let typimonLimitCount = 0;
  let textIndex = 0;

  // Game variable
  let typimonFinished = false;
  let playerFinished = false;
  let numOfErrors = 0;
  let winStatus;

  // Slider section that controls the speed variable
  const speedSlider = document.getElementById("typimonSpeed");

  let speed = 1000 - speedSlider.value;
  let wpm = (1000 / speed) * 60;

  // Trying to give users time to get ready
  let testSpeed = 5000;
  setTimeout(() => {
    function mainBotFunction() {
      /* To make the speed value dynamic, 
       the interval is to be cleared and reinitialized in every iteration: benjee remember!!!!!
      */
      clearInterval(speedUp__);

      testSpeed *= 0.5;
      // Main typimon code
      if (typimonLimitCount < generatedWord.length) {
        if (!(textIndex === generatedWord.length)) {
          gottenWord += generatedWord[textIndex];
          $("#__bot__type").text(gottenWord);

          // Incrementing limit count to avoid retyping
          typimonLimitCount++;
          textIndex++;
        } else {
          gottenWord = "";
          textIndex = 0;
        }
      } else {
        // This part executes when typimon is done typing
        typimonFinished = true;
        if (!playerFinished) {
          winStatus = "You Lose!";
          finished = true;
          clearInterval(timeManagerInterval);
          const finishedTime = `${minutesCounter}mins ${secondsCounter}secs`;

          $("#playerInput").attr("disabled", "true");
          $("#finishedchallenge__con").addClass("playerFinished");
          $("#win_stat").text(winStatus);
          $("#error_stat").text(numOfErrors);
          $("#time_stat").text(finishedTime);
        } else return; // Do nothing here
      }

      speed = 1000 - speedSlider.value;
      wpm = (1000 / speed) * 60;

      $("#wpm__text").text(Math.round(wpm));

      speedUp__ = setInterval(mainBotFunction, speed);
    }

    let speedUp__ = setInterval(mainBotFunction, speed);
  }, 1000);

  // Main Player part
  // Checking Player input if it matches the generated word based on the sliced range
  function checkPlayerError() {
    const playerInput = document.querySelector("#playerInput");
    playerInput.setAttribute("maxlength", generatedWord.length);
    playerInput.addEventListener("input", () => {
      const indexOfGeneratedWord = generatedWord.slice(0, playerInput.value.length);

      if (playerInput.value.toLowerCase() === indexOfGeneratedWord.toLowerCase()) {
        $("#status-box").removeClass("playerError");
        $("#status-text").css("color", "greenyellow");
        $("#status-text").text("Good");
      } else {
        // This gets executed when the player input don't match (ERROR)
        numOfErrors++;

        $("#status-box").addClass("playerError");
        $("#status-text").css("color", "red");
        $("#status-text").text("Word Mismatch!");
      }

      if (playerInput.value.length == playerInput.getAttribute("maxlength")) {
        // This part executes when typimon is done typing

        // Making player finish button enabled
        playerFinished = true;
        const finishBtn = $("#finish__btn");

        // This wont enable the button if typimon finishes first and matches given word
        if (!typimonFinished && playerInput.value.toLowerCase() === indexOfGeneratedWord.toLowerCase()) {
          finishBtn.removeAttr("disabled");

          finishBtn.on("click", () => {
            winStatus = "You Win!";
            finished = true;

            $("#finishedchallenge__con").addClass("playerFinished");
            $("#win_stat").text(winStatus);
            $("#error_stat").text(numOfErrors);
            $("#time_stat").text(`${minutesCounter}mins ${secondsCounter}secs`);

            playerInput.setAttribute("disabled", "true");
          });
        }
      }
    });
  }

  checkPlayerError();
}

$("#restart__finish").on("click", () => location.reload());

let numOfClicks = 0;
$("#start__btn").on("click", () => {
  // The countdown
  if (!((numOfClicks += 1) > 1)) {
    let counter = 3;
    $("#countdown").text(counter);

    setInterval(() => {
      // To prevent counter from counting down to -1
      if (counter !== 1) {
        counter--;
        $("#countdown").text(counter);
      } else {
        $("#countdown").text("");
      }
    }, 1000);

    setTimeout(() => {
      getWordData(); // Fetching the word data
      timeManager(); // Time Management function fired when start button is clicked
    }, 3000);
  }
});
