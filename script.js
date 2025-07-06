/* README
   Core quiz logic.
   Expects global const oopsPool (array) to be defined in oopsPool.js.
*/

// Define fallback: if window.oopsPool is undefined, set [].
if (typeof window.oopsPool === 'undefined') {
  window.oopsPool = [];
}

const demoPool = [
  "デモ質問1", "デモ質問2", "デモ質問3", "デモ質問4", "デモ質問5",
  "デモ質問6", "デモ質問7", "デモ質問8", "デモ質問9", "デモ質問10",
  "デモ質問11", "デモ質問12", "デモ質問13", "デモ質問14", "デモ質問15",
  "デモ質問16", "デモ質問17", "デモ質問18", "デモ質問19", "デモ質問20"
];

const quizPool = window.oopsPool.length > 0 ? window.oopsPool : demoPool;

const app = document.getElementById('app');
let yesCount = 0;
let currentQuestionIndex = 0;
let shuffledQuestions = [];

// Shuffle (Fisher–Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRank(score) {
  if (score <= 2) return 'ほぼ無傷';
  if (score <= 5) return 'かるくうっかり';
  if (score <= 8) return 'ポカしがち';
  if (score <= 11) return '常連';
  if (score <= 14) return 'プロ';
  if (score <= 17) return '伝説級';
  return 'カオス級'; // 18-20
}

function showResult() {
  const rank = getRank(yesCount);
  const total = shuffledQuestions.length;
  app.innerHTML = `
    <div id="result-container">
      <img src="cuteboy.png" alt="Cute Boy" id="cuteboy-img">
      <p id="result-text">あなたは “${rank}” だもの！<br>（○が ${yesCount}/${total}）</p>
      <button id="restart-btn" class="btn">もう一度診断</button>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', () => {
    location.reload();
  });
}

function renderQuestion() {
  if (currentQuestionIndex >= shuffledQuestions.length) {
    showResult();
    return;
  }

  const question = shuffledQuestions[currentQuestionIndex];
  app.innerHTML = `
    <div id="question-container">
      <h2>だもの診断</h2>
      <p id="question-text">${question}</p>
      <div>
        <button class="btn btn-yes">○</button>
        <button class="btn btn-no">✕</button>
      </div>
    </div>
  `;

  app.querySelector('.btn-yes').addEventListener('click', () => {
    yesCount++;
    currentQuestionIndex++;
    renderQuestion();
  });

  app.querySelector('.btn-no').addEventListener('click', () => {
    currentQuestionIndex++;
    renderQuestion();
  });
}

function startQuiz() {
    yesCount = 0;
    currentQuestionIndex = 0;
    // Shuffle the entire pool and pick the first 20 questions
    shuffledQuestions = shuffle([...quizPool]).slice(0, 20);
    renderQuestion();
}

// Initial load
startQuiz();