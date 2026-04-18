let questions = [];
let index = 0;
let answers = [];
let intervalId = null;
let reviewIndex = 0;

// Load your AffairsCloud Questions
fetch("questions.json")
  .then(res => res.json())
  .then(data => { questions = data; })
  .catch(err => console.log("Check questions.json file", err));

// Restore the working Start Button
document.getElementById("startBtn").addEventListener("click", () => {
  const user = document.getElementById("userName").value;
  if (!user) return alert("Please enter your name!");
  document.querySelector(".loginPage").style.display = "none";
  document.querySelector(".quizzPage").style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  clearInterval(intervalId);
  if (index >= questions.length) return showResults();

  const q = questions[index];
  document.getElementById("questionStat").textContent = `${index + 1} / ${questions.length}`;
  
  document.querySelector(".quizzContainer").innerHTML = `
    <div class="questionText"><p>${q.question}</p></div>
    <div class="quizes">
      ${q.options.map(opt => `
        <div class="questions">
          <label><input type="radio" name="quizOpt" value="${opt}" ${answers[index] === opt ? 'checked' : ''}> ${opt}</label>
        </div>`).join('')}
    </div>
    <div style="margin-top: 15px;">
        <button onclick="handleNext()">Next</button>
        <button onclick="showResults()" style="background:#e74c3c;">Submit</button>
    </div>`;
  startTimer();
}

function startTimer() {
  let time = 30;
  intervalId = setInterval(() => {
    document.querySelector(".timer").textContent = `00:${time < 10 ? '0'+time : time}`;
    if (time <= 0) handleNext();
    time--;
  }, 1000);
}

function handleNext() {
  const sel = document.querySelector('input[name="quizOpt"]:checked');
  answers[index] = sel ? sel.value : "Not Answered";
  index++;
  loadQuestion();
}

function showResults() {
  clearInterval(intervalId);
  document.querySelector(".quizzPage").style.display = "none";
  document.querySelector(".resultPage").style.display = "block";

  let r = 0, w = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) r++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) w++;
  });

  let net = (r * 1) - (w * 0.25);

  // Putting the score back inside your original circle div
  document.getElementById("userScore").innerHTML = `
    <span style="font-size: 0.8rem; color: #666;">CORRECT: ${r} | WRONG: ${w}</span>
    <h1 style="font-size: 3rem; margin: 5px 0;">${net.toFixed(2)}</h1>
    <span style="font-size: 1rem; color: #7ed321;">NET SCORE</span>
  `;
  
  document.getElementById("totalScore").textContent = questions.length;
  renderReview();
}

function renderReview() {
  const q = questions[reviewIndex];
  const u = answers[reviewIndex] || "Not Answered";
  const isCorrect = u === q.answer;

  const container = document.getElementById("reviewBox") || document.createElement('div');
  container.id = "reviewBox";
  container.className = "review-container";
  document.querySelector(".resultPage").appendChild(container);

  container.innerHTML = `
    <h4>Review Question ${reviewIndex + 1}</h4>
    <p><strong>${q.question}</strong></p>
    <p style="color:${isCorrect ? 'green' : 'red'}">Your Answer: ${u}</p>
    ${!isCorrect ? `<p style="color:green">Correct: ${q.answer}</p>` : '<b>✓ Correct</b>'}
    <div style="display:flex; justify-content: space-between; margin-top:10px;">
        <button onclick="changeReview(-1)" ${reviewIndex === 0 ? 'disabled' : ''}>Prev</button>
        <button onclick="changeReview(1)" ${reviewIndex === questions.length - 1 ? 'disabled' : ''}>Next</button>
    </div>
  `;
}

function changeReview(step) {
  reviewIndex += step;
  renderReview();
}
