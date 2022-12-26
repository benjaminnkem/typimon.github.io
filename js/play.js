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

  $("#refresh__btn").on("click", () => {
    randWordDisplay.text(generatedWord);
  });

  let gottenWord = "";

  let speed = 200;
  let typimonLimitCount = 0;
  let textIndex = 0;

  // Game variable
  let typimonFinished = false;
  let playerFinished = false;

  // Trying to give palyers a time t9 get ready
  setTimeout(() => {
    // Main bot code
    setInterval(() => {
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
    }, speed);
  }, 1000);

  // Checking Player input if it matches the generated word based on the index range
  function checkPlayerError() {
    const playerInput = document.querySelector("#playerInput");
    playerInput.setAttribute("maxlength", generatedWord.length);
    playerInput.addEventListener("input", () => {
      const indexOfGeneratedWord = generatedWord.slice(0, playerInput.value.length);

      // console.log("Generated:" + indexOfGeneratedWord);
      // console.log("Player:" + playerInput.value);

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

  // To prevent the countr from reaching -1
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

    setTimeout(() => getWordData(), 3000);
  }
});
