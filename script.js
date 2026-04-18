let questions = [];
let index = 0;
let answers = [];
let intervalId = null;

// Fetch the questions you've prepared
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    document.getElementById("questionStat").textContent = `Loaded: ${questions.length} Qs`;
  })
  .catch(err => console.error("Fuel tank empty! Update questions.json", err));

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
          <label><input type="radio" name="quizOpt" value="${opt}"> ${opt}</label>
        </div>`).join('')}
    </div>`;
  
  startTimer();
}

function startTimer() {
  let time = 30; // 30 seconds per question for SBI PO speed
  intervalId = setInterval(() => {
    document.querySelector(".timer").textContent = `00:${time < 10 ? '0'+time : time}`;
    if (time <= 0) { clearInterval(intervalId); handleNext(); }
    time--;
  }, 1000);
}

document.querySelector(".nextBtn").addEventListener("click", handleNext);

function handleNext() {
  const selected = document.querySelector('input[name="quizOpt"]:checked');
  answers[index] = selected ? selected.value : "Skipped";
  index++;
  loadQuestion();
}

function showResults() {
  document.querySelector(".quizzPage").style.display = "none";
  document.querySelector(".resultPage").style.display = "block";
  let score = 0;
  let reviewHTML = `<div style="text-align:left; margin-top:20px;"><h3>Wrong Answer Analysis:</h3>`;

  questions.forEach((q, i) => {
    const isCorrect = q.answer === answers[i];
    if (isCorrect) score++;
    else {
      reviewHTML += `
        <div style="border-bottom: 1px solid #ff4d4d; padding: 10px; background: #fffafa;">
          <p><strong>${i+1}. ${q.question}</strong></p>
          <p style="color: red;">Your Choice: ${answers[i]}</p>
          <p style="color: green;">Correct Fact: ${q.answer}</p>
        </div>`;
    }
  });

  document.getElementById("userScore").textContent = score;
  document.getElementById("totalScore").textContent = questions.length;
  
  let container = document.getElementById("reviewBox") || document.createElement("div");
  container.id = "reviewBox";
  document.querySelector(".resultPage").appendChild(container);
  container.innerHTML = score === questions.length ? "<h4>Perfect Score! 🎯</h4>" : reviewHTML;
}

document.querySelector(".replayBtn").addEventListener('click', () => location.reload());
