let questions = [];
let index = 0;
let answers = [];
let intervalId = null;
let reviewIndex = 0;

fetch("questions.json")
  .then(res => res.json())
  .then(data => { questions = data; })
  .catch(err => console.error("Error loading JSON", err));

// Start Button Logic
document.getElementById("startBtn").addEventListener("click", () => {
  const user = document.getElementById("userName").value;
  if (!user) return alert("Please enter your name");
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
    <div style="margin-top: 20px;">
        <button class="nextBtn" onclick="handleNext()">Next</button>
        <button class="submitBtn" onclick="showResults()">Submit Quiz</button>
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
  const selected = document.querySelector('input[name="quizOpt"]:checked');
  answers[index] = selected ? selected.value : "Not Answered";
  index++;
  loadQuestion();
}

function showResults() {
  clearInterval(intervalId);
  document.querySelector(".quizzPage").style.display = "none";
  const resPage = document.querySelector(".resultPage");
  resPage.style.display = "block";

  let correct = 0, wrong = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correct++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) wrong++;
  });

  let net = (correct * 1) - (wrong * 0.25);

  resPage.innerHTML = `
    <h2>Quiz Completed!</h2>
    <div class="score-card">
      <p style="color:green">Correct: ${correct}</p>
      <p style="color:red">Wrong: ${wrong}</p>
      <hr style="margin:10px 0; border:0; border-top:1px solid #eee;">
      <small>NET SCORE</small>
      <span class="net-score">${net.toFixed(2)}</span>
      <p>out of ${questions.length}</p>
    </div>
    <button class="nextBtn" onclick="location.reload()">Replay</button>
    <div id="reviewContainer"></div>
  `;
  startReview();
}

function startReview() {
  const container = document.getElementById("reviewContainer");
  const q = questions[reviewIndex];
  const userAns = answers[reviewIndex] || "Not Answered";
  const isCorrect = userAns === q.answer;

  container.innerHTML = `
    <div class="review-box">
      <h4>Review: Q${reviewIndex + 1}</h4>
      <p><strong>${q.question}</strong></p>
      <p style="color:${isCorrect ? 'green' : 'red'}">Your Answer: ${userAns}</p>
      ${!isCorrect ? `<p style="color:green">Correct: ${q.answer}</p>` : '<b>✓ Correct</b>'}
      <div style="display:flex; justify-content: space-between; margin-top:10px;">
        <button onclick="changeReview(-1)" ${reviewIndex === 0 ? 'disabled' : ''}>Prev</button>
        <button onclick="changeReview(1)" ${reviewIndex === questions.length-1 ? 'disabled' : ''}>Next</button>
      </div>
    </div>
  `;
}

function changeReview(step) {
  reviewIndex += step;
  startReview();
}
