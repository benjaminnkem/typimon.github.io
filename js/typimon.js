const typingCon = $("#typimonInfo");
let wordToType = `Typimon, the brainchild of Nkem Benjamin, is a cutting-edge typing AI that generates random words to test and enhance your typing speed and consistency. It's a powerful tool for improving your typing skills.`;

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
