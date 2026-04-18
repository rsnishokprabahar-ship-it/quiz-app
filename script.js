let questions = [];
let index = 0;
let answers = [];
let intervalId = null;
let reviewIndex = 0;

fetch("questions.json")
  .then(res => res.json())
  .then(data => { questions = data; })
  .catch(err => console.error("Update questions.json", err));

document.getElementById("startBtn").addEventListener("click", () => {
  const user = document.getElementById("userName").value;
  if (!user) return alert("Enter your name to begin!");
  document.querySelector(".loginPage").style.display = "none";
  document.querySelector(".quizzPage").style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  clearInterval(intervalId);
  if (index >= questions.length) return showResults();

  const q = questions[index];
  document.getElementById("questionStat").textContent = `Q: ${index + 1} / ${questions.length}`;
  
  document.querySelector(".quizzContainer").innerHTML = `
    <div class="questionText"><p>${q.question}</p></div>
    <div class="quizes">
      ${q.options.map(opt => `
        <div class="questions">
          <label style="display:block; padding:12px; background:#f9f9f9; border:1px solid #ddd; border-radius:8px; margin-bottom:10px;">
            <input type="radio" name="quizOpt" value="${opt}" ${answers[index] === opt ? 'checked' : ''}> ${opt}
          </label>
        </div>`).join('')}
    </div>
    <div style="margin-top:20px;">
        <button onclick="handleNext()" style="background:#27ae60; color:white;">Next</button>
        <button onclick="showResults()" style="background:#e74c3c; color:white;">Submit</button>
    </div>`;
  startTimer();
}

function startTimer() {
  let time = 30;
  intervalId = setInterval(() => {
    document.querySelector(".timer").textContent = `Time: ${time}s`;
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
  const resPage = document.querySelector(".resultPage");
  resPage.style.display = "block";

  let r = 0, w = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) r++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) w++;
  });

  let net = (r * 1) - (w * 0.25);

  resPage.innerHTML = `
    <h2>Quiz Results</h2>
    <div class="score-card">
      <p style="color:green">Correct: ${r}</p>
      <p style="color:red">Wrong: ${w}</p>
      <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
      <small>NET SCORE</small>
      <span class="net-score">${net.toFixed(2)}</span>
    </div>
    <button onclick="location.reload()" style="background:#3498db; color:white;">Try Again</button>
    <div id="reviewContainer"></div>
  `;
  startReview();
}

function startReview() {
  const container = document.getElementById("reviewContainer");
  const q = questions[reviewIndex];
  const u = answers[reviewIndex] || "Not Answered";
  const correct = u === q.answer;

  container.innerHTML = `
    <div class="review-box">
      <p><strong>Q${reviewIndex + 1}:</strong> ${q.question}</p>
      <p style="color:${correct ? 'green' : 'red'}">You: ${u}</p>
      ${!correct ? `<p style="color:green">Correct: ${q.answer}</p>` : '<b>✓ Perfect</b>'}
      <div style="display:flex; justify-content:space-between; margin-top:10px;">
        <button onclick="moveReview(-1)" ${reviewIndex === 0 ? 'disabled' : ''}>Prev</button>
        <button onclick="moveReview(1)" ${reviewIndex === questions.length-1 ? 'disabled' : ''}>Next</button>
      </div>
    </div>
  `;
}

function moveReview(s) { reviewIndex += s; startReview(); }
