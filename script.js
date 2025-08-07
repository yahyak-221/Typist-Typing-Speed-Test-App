let timer;
let timeLeft = 60;
let isTyping = false;
let startTime;
let text = "The quick brown fox jumps over the lazy dog.";

const input = document.getElementById("text-input");
const textDisplay = document.getElementById("text-display");
const timeDisplay = document.getElementById("time-left");
const wpmDisplay = document.getElementById("live-wpm");
const resultDisplay = document.getElementById("result");

// 1. Render text as spans
function loadText() {
  textDisplay.innerHTML = "";
  for (let char of text) {
    const span = document.createElement("span");
    span.textContent = char;
    textDisplay.appendChild(span);
  }
}

// 2. Start typing test
function startTest() {
  input.value = "";
  input.disabled = false;
  input.focus();
  resultDisplay.textContent = "";
  timeLeft = 60;
  timeDisplay.textContent = timeLeft;
  wpmDisplay.textContent = 0;
  isTyping = false;
  loadText();

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    if (isTyping) {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      const typedText = input.value.trim();
      const wordsTyped =
        typedText.length === 0 ? 0 : typedText.split(/\s+/).length;
      const timeSpent = 60 - timeLeft || 1;
      const currentWPM = Math.round((wordsTyped / timeSpent) * 60);
      wpmDisplay.textContent = currentWPM;

      if (timeLeft === 0) {
        clearInterval(timer);
        endTest();
      }
    }
  }, 1000);
}

// 3. Highlight correct/incorrect characters
input.addEventListener("input", () => {
  const enteredText = input.value;
  const spans = textDisplay.querySelectorAll("span");

  spans.forEach((span, index) => {
    const char = enteredText[index];
    if (char == null) {
      span.classList.remove("correct", "incorrect");
    } else if (char === span.textContent) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });
});

input.addEventListener("keydown", () => {
  if (!isTyping) {
    startTime = new Date().getTime();
    isTyping = true;
  }
});

function endTest() {
  input.disabled = true;
  const typedText = input.value.trim();
  const wordsTyped = typedText.length === 0 ? 0 : typedText.split(/\s+/).length;
  const wpm = Math.round((wordsTyped / 60) * 60);
  resultDisplay.textContent = `⏱ Time's up! You typed ${wordsTyped} words. Speed: ${wpm} WPM`;
}

// Load initial text
loadText();
