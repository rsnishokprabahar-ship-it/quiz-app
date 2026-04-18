let questions = [];
let index = 0;
let answers = [];
let intervalId = null;
let reviewIndex = 0;

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    document.getElementById("questionStat").textContent = `Loaded: ${questions.length} Qs`;
  })
  .catch(err => console.error("Update questions.json", err));

document.getElementById("startBtn").addEventListener("click", () => {
  if (!document.getElementById("userName").value) return alert("Enter Name");
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
    <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
        <button class="nextBtn" onclick="handleNext()">Next</button>
        <button class="submitBtn" onclick="showResults()" style="background: #e74c3c;">Submit Quiz</button>
    </div>`;
  
  startTimer();
}

function startTimer() {
  let time = 30;
  intervalId = setInterval(() => {
    document.querySelector(".timer").textContent = `00:${time < 10 ? '0'+time : time}`;
    if (time <= 0) { clearInterval(intervalId); handleNext(); }
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
  // Save current answer before submitting
  const selected = document.querySelector('input[name="quizOpt"]:checked');
  if(index < questions.length) answers[index] = selected ? selected.value : "Not Answered";

  document.querySelector(".quizzPage").style.display = "none";
  document.querySelector(".resultPage").style.display = "block";

  let correctCount = 0;
  let wrongCount = 0;
  
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correctCount++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) wrongCount++;
  });

  let netScore = (correctCount * 1) - (wrongCount * 0.25);
  
  document.getElementById("userScore").innerHTML = `
    <div style="font-size: 1.2rem; color: #555;">Correct: ${correctCount} | Wrong: ${wrongCount}</div>
    <div style="font-size: 2.5rem; font-weight: bold; color: #2c3e50;">Net Score: ${netScore.toFixed(2)}</div>
  `;
  document.getElementById("totalScore").textContent = questions.length;
  
  startReview();
}

function startReview() {
  const resultDiv = document.querySelector(".resultPage");
  let reviewBox = document.getElementById("reviewBox") || document.createElement("div");
  reviewBox.id = "reviewBox";
  resultDiv.appendChild(reviewBox);
  showReviewSlide();
}

function showReviewSlide() {
  const q = questions[reviewIndex];
  const userAns = answers[reviewIndex] || "Not Answered";
  const isCorrect = userAns === q.answer;

  document.getElementById("reviewBox").innerHTML = `
    <div style="margin-top:30px; padding: 20px; border: 2px solid #ddd; border-radius: 10px; background: white;">
      <h4>Review Question ${reviewIndex + 1} of ${questions.length}</h4>
      <p><strong>${q.question}</strong></p>
      <p style="color: ${isCorrect ? 'green' : 'red'}">Your Answer: ${userAns}</p>
      ${!isCorrect ? `<p style="color: green">Correct Answer: <b>${q.answer}</b></p>` : '<p style="color: green">✓ Correct!</p>'}
      
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button onclick="changeReview(-1)" ${reviewIndex === 0 ? 'disabled' : ''}>Prev</button>
        <button onclick="changeReview(1)" ${reviewIndex === questions.length - 1 ? 'disabled' : ''}>Next</button>
      </div>
    </div>
  `;
}

function changeReview(step) {
  reviewIndex += step;
  showReviewSlide();
}

document.querySelector(".replayBtn").addEventListener('click', () => location.reload());
