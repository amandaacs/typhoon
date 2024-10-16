const t1ScoreDisplay = document.getElementById("t1-score");
const t2ScoreDisplay = document.getElementById("t2-score");
const questionBox = document.querySelector(".question");
const questionTxt = document.getElementById("question-txt");
const difficulty = document.getElementById("difficulty");
const rightBtn = document.getElementById("right");
const wrongBtn = document.getElementById("wrong");
const game = document.querySelector(".game");

let t1Score = 0;
let t2Score = 0;

const emojis = [
    "T", "V", "V", "H", "H", "T",
    "EASY", "EASY", "MEDIUM", "MEDIUM",
    "HARD", "HARD", "EASY", "MEDIUM", "HARD", "H"
];

const easy = [
    "What color is the sky on a sunny day?",
    "How many legs does a cat have?",
    "What fruit is yellow and long?"
];

const medium = [
    "Name the four seasons of the year.",
    "What are the primary colors?",
    "What is the opposite of BIG?"
];

const hard = [
    "How many minutes are in an hour?",
    "What is the smallest ocean in the world?",
    "What is the capital of the United Kingdom?"
];

let openCards = [];
let currentScore = 0;

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 1 : -1);

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    this.classList.add("boxOpen");
    openCards.push(this);
    checkMatch();
}

function checkMatch() {
    if (openCards.length > 0) {
        const lastCard = openCards[openCards.length - 1];
        console.log(openCards.length - 1);

        if (lastCard) {
            if (lastCard.innerHTML.length > 1) {
                answerQuestions();
            } else {
                updateScore();
            }
        }
    }
}

function handleRightBtn() {

    if ((openCards.length) % 2 === 0) {
        t2Score += currentScore;
        t2ScoreDisplay.innerText = t2Score;
    } else {
        t1Score += currentScore;
        t1ScoreDisplay.innerText = t1Score;
    }
    questionBox.style.display = "none";
}

function handleWrongBtn() {
    questionBox.style.display = "none";
}

function answerQuestions() {
    const lastCard = openCards[openCards.length - 1];


    currentScore = 0;


    rightBtn.removeEventListener("click", handleRightBtn);
    wrongBtn.removeEventListener("click", handleWrongBtn);

    let question = '';
    if (lastCard.innerHTML === "EASY") {
        difficulty.innerText = "EASY";
        const randomIndex = Math.floor(Math.random() * easy.length);
        question = easy[randomIndex];
        questionTxt.innerText = question;
        easy.splice(randomIndex, 1);
        questionBox.style.display = "block";
        currentScore = 2;

    } else if (lastCard.innerHTML === "MEDIUM") {
        difficulty.innerText = "MEDIUM";
        const randomIndex = Math.floor(Math.random() * medium.length);
        question = medium[randomIndex];
        questionTxt.innerText = question;
        medium.splice(randomIndex, 1);
        questionBox.style.display = "block";
        currentScore = 3;

    } else {
        difficulty.innerText = "HARD";
        const randomIndex = Math.floor(Math.random() * hard.length);
        question = hard[randomIndex];
        questionTxt.innerText = question;
        hard.splice(randomIndex, 1);
        questionBox.style.display = "block";
        currentScore = 5;
    }


    rightBtn.addEventListener("click", handleRightBtn);
    wrongBtn.addEventListener("click", handleWrongBtn);
}

function updateScore() {
    const lastCard = openCards[openCards.length - 1];

    if ((openCards.length) % 2 === 0) {
        if (lastCard.innerHTML === "H") {
            console.log("t1: -5");
            if (t1Score - 5 > 0) {
                t1Score -= 5;
            } else {
                t1Score = 0;
            }
        } else if (lastCard.innerHTML === "V") {
            t2Score += 5;
        } else {
            t2Score = 0;
        }
    } else {
        if (lastCard.innerHTML === "H") {
            if (t2Score - 5 > 0) {
                t2Score -= 5;
            } else {
                t2Score = 0;
            }
        } else if (lastCard.innerHTML === "V") {
            t1Score += 5;
        } else {
            t1Score = 0;
        }
    }

    t1ScoreDisplay.innerText = t1Score;
    t2ScoreDisplay.innerText = t2Score;
}
