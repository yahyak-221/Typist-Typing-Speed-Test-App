let startTime;

const input = document.getElementById("text-input");

input.addEventListener("focus", () => {
  startTime = new Date().getTime();
});

function checkTyping() {
  const givenText = document.getElementById("text-display").textContent;
  const typedText = input.value;
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000;

  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeTaken) * 60);

  const result = `You typed ${wordsTyped} words in ${Math.round(
    timeTaken
  )} seconds. Typing Speed: ${wpm} WPM`;

  document.getElementById("result").textContent = result;
}
