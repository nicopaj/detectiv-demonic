
let currentChapter = 0;
let mistakes = 0;
const maxMistakes = 3;

function startGame() {
  document.getElementById('intro').classList.remove('active');
  showChapter();
}

function showChapter() {
  if (currentChapter >= chapters.length) {
    document.getElementById('victory').classList.add('active');
    return;
  }

  const chapter = chapters[currentChapter];
  document.getElementById('chapterTitle').innerText = chapter.title;
  document.getElementById('storyText').innerText = chapter.text;

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  chapter.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.innerText = choice.text;
    btn.onclick = () => handleAnswer(choice.correct);
    choicesDiv.appendChild(btn);
  });

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('chapter').classList.add('active');
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    currentChapter++;
    showChapter();
  } else {
    mistakes++;
    if (mistakes >= maxMistakes) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('gameOver').classList.add('active');
    } else {
      alert("Greșit! Ai " + (maxMistakes - mistakes) + " încercări rămase.");
    }
  }
}

function restartGame() {
  currentChapter = 0;
  mistakes = 0;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('intro').classList.add('active');
}
