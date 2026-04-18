let questions = [];
let index = 0;
let answers = [];
let intervalId = null;

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    setQuestionStats();
  })
  .catch((error) => console.error("Error loading questions:", error));

document.getElementById("startBtn").addEventListener("click", function () {
  let username = document.getElementById("userName").value;
  if (username == "") {
    document.getElementById("userName").style.border = "1px solid red";
    document.querySelector("#errorMsg").style.display = "block";
    return;
  }
  document.querySelector(".userText").textContent = username;
  document.querySelector(".loginPage").style.display = "none";
  document.querySelector(".quizzPage").style.display = "block";
  loadQuestions();
});

document.querySelector(".nextBtn").addEventListener("click", function () {
  const selected = document.querySelector(`input[name="question${index}"]:checked`);
  answers[index] = selected ? selected.value : "No Answer";
  
  index++;
  if (index < questions.length) {
    loadQuestions();
    setQuestionStats();
  } else {
    showResults();
  }
});

function setQuestionStats() {
  document.getElementById("questionStat").textContent = `${index + 1}/${questions.length}`;
}

function setTimerOn() {
  clearInterval(intervalId);
  let time = 30;
  intervalId = setInterval(() => {
    if (time <= 0) {
      clearInterval(intervalId);
      document.querySelector(".nextBtn").click();
    } else {
      document.querySelector(".timer").textContent = `00:${time < 10 ? '0' + time : time}`;
      time--;
    }
  }, 1000);
}

function loadQuestions() {
  setTimerOn();
  const q = questions[index];
  document.querySelector(".quizzContainer").innerHTML = `
    <div class="questionText"><p>${q.question}</p></div>
    <div class="quizes">
      ${q.options.map(opt => `
        <div class="questions">
          <label><input type="radio" name="question${index}" value="${opt}" /> ${opt}</label>
        </div>`).join('')}
    </div>`;
}

function showResults() {
  clearInterval(intervalId);
  document.querySelector(".quizzPage").style.display = "none";
  document.querySelector(".resultPage").style.display = "block";
  
  let score = 0;
  let reviewHtml = "<h3>Review Your Answers:</h3>";
  
  questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.answer;
    if (isCorrect) score++;
    
    reviewHtml += `
      <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ddd;">
        <p><strong>Q${i+1}: ${q.question}</strong></p>
        <p style="color: ${isCorrect ? 'green' : 'red'}">Your Answer: ${answers[i]}</p>
        ${!isCorrect ? `<p style="color: green">Correct Answer: ${q.answer}</p>` : ''}
      </div>`;
  });

  document.getElementById("userScore").textContent = score;
  document.getElementById("totalScore").textContent = questions.length;
  
  // Create a review div if it doesn't exist
  let reviewDiv = document.getElementById("reviewContainer");
  if(!reviewDiv) {
    reviewDiv = document.createElement("div");
    reviewDiv.id = "reviewContainer";
    document.querySelector(".resultPage").appendChild(reviewDiv);
  }
  reviewDiv.innerHTML = reviewHtml;
}

document.querySelector(".replayBtn").addEventListener('click', () => location.reload());
