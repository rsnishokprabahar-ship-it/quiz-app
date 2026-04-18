function showResults() {
  clearInterval(intervalId);
  const selected = document.querySelector('input[name="quizOpt"]:checked');
  if(index < questions.length) answers[index] = selected ? selected.value : "Not Answered";

  document.querySelector(".quizzPage").style.display = "none";
  const resultPage = document.querySelector(".resultPage");
  resultPage.style.display = "block";

  let correctCount = 0;
  let wrongCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correctCount++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) wrongCount++;
  });
  let netScore = (correctCount * 1) - (wrongCount * 0.25);

  // This replaces everything with the new clean CSS layout
  resultPage.innerHTML = `
    <div class="result-card">
      <h2>Results</h2>
      <div class="score-container">
        <div style="display:flex; justify-content: space-around; margin-bottom: 10px;">
           <span style="color:green">Right: ${correctCount}</span>
           <span style="color:red">Wrong: ${wrongCount}</span>
        </div>
        <p style="font-size: 0.8rem; color: #7f8c8d;">NET SCORE</p>
        <span class="net-score-val">${netScore.toFixed(2)}</span>
      </div>
      
      <div style="display:flex; gap:10px; justify-content:center;">
        <button class="replayBtn" onclick="location.reload()">Replay</button>
        <button class="submitBtn" onclick="window.location.href='https://github.com'">Quit</button>
      </div>

      <div id="reviewBox"></div>
    </div>
  `;
  startReview();
}
