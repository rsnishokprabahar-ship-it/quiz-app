function showResults() {
  clearInterval(intervalId);
  const selected = document.querySelector('input[name="quizOpt"]:checked');
  if(index < questions.length) answers[index] = selected ? selected.value : "Not Answered";

  document.querySelector(".quizzPage").style.display = "none";
  const resultPage = document.querySelector(".resultPage");
  resultPage.style.display = "block";

  // 1. Calculate Scores
  let correctCount = 0;
  let wrongCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correctCount++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) wrongCount++;
  });
  let netScore = (correctCount * 1) - (wrongCount * 0.25);

  // 2. Wipe the old overlapping UI and replace with a clean card
  const scoreBox = document.getElementById("userScore");
  
  // This hides the old "Net Score:" text and the circle container
  scoreBox.parentElement.style.display = "flex";
  scoreBox.parentElement.style.flexDirection = "column";
  scoreBox.parentElement.style.alignItems = "center";
  
  scoreBox.innerHTML = `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; border: 1px solid #dee2e6; width: 90%; margin: 10px auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 15px 0; color: #333; font-size: 1.5rem;">Quiz Summary</h2>
      
      <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
        <div style="text-align: center;">
          <p style="margin: 0; color: #27ae60; font-size: 0.9rem; font-weight: bold;">CORRECT</p>
          <p style="margin: 5px 0; font-size: 1.4rem;">${correctCount}</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; color: #e74c3c; font-size: 0.9rem; font-weight: bold;">WRONG</p>
          <p style="margin: 5px 0; font-size: 1.4rem;">${wrongCount}</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; color: #7f8c8d; font-size: 0.9rem; font-weight: bold;">TOTAL</p>
          <p style="margin: 5px 0; font-size: 1.4rem;">${questions.length}</p>
        </div>
      </div>

      <div style="border-top: 2px solid #fff; padding-top: 15px; background: #fff; border-radius: 10px; padding: 15px;">
        <p style="margin: 0; color: #2c3e50; font-size: 1rem; font-weight: bold;">NET SCORE</p>
        <p style="margin: 5px 0; font-size: 3.5rem; color: #2c3e50; font-weight: 900;">${netScore.toFixed(2)}</p>
      </div>
    </div>
  `;

  // Hide the static elements that are causing the overlap
  const elementsToHide = resultPage.querySelectorAll('p, span');
  elementsToHide.forEach(el => {
    if(el.textContent.includes("Score") || el.textContent.includes("/") || el.id === "totalScore") {
      el.style.opacity = "0"; 
      el.style.height = "0";
      el.style.margin = "0";
    }
  });

  startReview();
}
