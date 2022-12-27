async function getWordData() {
  const fetcher = fetch("/rand_data/random.json");
  const response = (await fetcher).json();

  response
    .then((data) => {
      typimonCode(data);
    })
    .catch((err) => {
      throw err;
    });
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

  // Slider section that controls the speed variable
  const speedSlider = document.getElementById("typimonSpeed");

  let speed = 1000 - speedSlider.value;
  let wpm = (1000 / speed) * 60;

  // Trying to give palyers a time to get ready

  let testSpeed = 5000;
  setTimeout(() => {
    function mainBotFunction() {
      /* To make the speed value dynamic, 
       the interval is to be cleared and resinitialized in every iteration: benjee remember!!!!!
      */
      clearInterval(speedUp__);

      testSpeed *= 0.5;
      // Main typimon code
      if (typimonLimitCount < generatedWord.length) {
        if (!(textIndex === generatedWord.length)) {
          gottenWord += generatedWord[textIndex];
          $("#__bot__type").text(gottenWord);

          // Increementing limit count to avoid retyping
          typimonLimitCount++;
          textIndex++;
        } else {
          gottenWord = "";
          textIndex = 0;

          typimonFinished = true;
        }
      }

      speed = 1000 - speedSlider.value;
      wpm = (1000 / speed) * 60;

      $("#wpm__text").text(Math.round(wpm));

      speedUp__ = setInterval(mainBotFunction, speed);
    }

    let speedUp__ = setInterval(mainBotFunction, speed);
  }, 1000);

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
        $("#status-box").addClass("playerError");
        $("#status-text").css("color", "red");
        $("#status-text").text("Word Mismatch!");
      }
    });
  }

  checkPlayerError();
}

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

      // Making player finish button enabled
      const finishBtn = document.querySelector("#finish__btn");
      finishBtn.removeAttribute("disabled");
    }, 3000);
  }
});

function timeManager() {
  const secDisplay = $("#sec__display");
  const minDisplay = $("#min__display");

  let secondsCounter = 0;
  let minutesCounter = 0;

  setInterval(() => {
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
}
