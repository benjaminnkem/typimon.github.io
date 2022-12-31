const typingCon = $("#typercon p");
let wordToType = `Typimon is a basic typing AI built by Nkem Benjamin that generates random words that 
challenges your typing speed and consistency which helps 
improves your typing skills and saves your highest score in the browser.
                                                  `;
let gottenWord = "";

let goingForward = true;
let speed = 100;

let textIndex = 0;

setInterval(() => {
  if (!(textIndex === wordToType.length)) {
    gottenWord += wordToType[textIndex];
    typingCon.text(gottenWord);
    textIndex++;
  } else {
    gottenWord = "";
    textIndex = 0;
  }
}, speed);
