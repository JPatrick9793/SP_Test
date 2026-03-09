const words = [
  "planet",
  "garden",
  "puzzle",
  "stream",
  "orange",
  "window",
  "school",
  "rocket",
  "bridge",
  "camera",
];

const scrambledWordEl = document.getElementById("scrambled-word");
const guessEl = document.getElementById("guess");
const messageEl = document.getElementById("message");
const scoreEl = document.getElementById("score");
const checkBtn = document.getElementById("check-btn");
const nextBtn = document.getElementById("next-btn");

let currentWord = "";
let score = 0;

function shuffleWord(word) {
  const chars = word.split("");

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  const shuffled = chars.join("");
  return shuffled === word ? shuffleWord(word) : shuffled;
}

function setMessage(text, type = "") {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`.trim();
}

function pickNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledWordEl.textContent = shuffleWord(currentWord);
  guessEl.value = "";
  setMessage("");
  guessEl.focus();
}

function checkGuess() {
  const guess = guessEl.value.trim().toLowerCase();

  if (!guess) {
    setMessage("Type a guess first.", "error");
    return;
  }

  if (guess === currentWord) {
    score += 1;
    scoreEl.textContent = score;
    setMessage("Correct! Great job.", "success");
  } else {
    setMessage(`Not quite. The word was \"${currentWord}\".`, "error");
  }
}

checkBtn.addEventListener("click", checkGuess);
nextBtn.addEventListener("click", pickNewWord);
guessEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

pickNewWord();
