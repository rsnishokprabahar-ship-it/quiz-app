function showResults() {
  clearInterval(intervalId);
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
  
  // Clean layout to prevent overlapping
  document.getElementById("userScore").innerHTML = `
    <div style="margin-bottom: 20px;">
      <p style="margin: 5px 0; color: #27ae60; font-weight: bold;">Correct: ${correctCount}</p>
      <p style="margin: 5px 0; color: #e74c3c; font-weight: bold;">Wrong: ${wrongCount}</p>
    </div>
    <div style="border-top: 2px solid #eee; pt-10px;">
      <h2 style="margin: 10px 0 0 0; color: #2c3e50;">Net Score</h2>
      <span style="font-size: 3rem; font-weight: 800; color: #2c3e50;">${netScore.toFixed(2)}</span>
      <span style="font-size: 1.2rem; color: #7f8c8d;"> / ${questions.length}</span>
    </div>
  `;

  // Hide the old static "totalScore" if it's still floating around
  const totalScoreElem = document.getElementById("totalScore");
  if(totalScoreElem) totalScoreElem.style.display = "none";
  
  startReview();
}
