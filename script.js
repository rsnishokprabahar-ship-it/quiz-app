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

  // We are injecting the full layout into the userScore div
  document.getElementById("userScore").innerHTML = `
    <div style="color: #27ae60; font-weight: bold; font-size: 1.1rem;">Correct: ${correctCount}</div>
    <div style="color: #e74c3c; font-weight: bold; font-size: 1.1rem;">Wrong: ${wrongCount}</div>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
    <div style="color: #7f8c8d; font-size: 0.9rem; text-transform: uppercase;">Net Score</div>
    <div style="font-size: 3rem; font-weight: 800; color: #2c3e50; margin: 5px 0;">${netScore.toFixed(2)}</div>
    <div style="color: #bdc3c7;">out of ${questions.length}</div>
  `;

  startReview();
}
