function showResults() {
  clearInterval(intervalId);
  
  // 1. Final Answer Save
  const selected = document.querySelector('input[name="quizOpt"]:checked');
  if(index < questions.length) answers[index] = selected ? selected.value : "Not Answered";

  // 2. Hide Quiz Page
  document.querySelector(".quizzPage").style.display = "none";
  const resultPage = document.querySelector(".resultPage");
  resultPage.style.display = "block";

  // 3. Calculate Scores
  let correctCount = 0;
  let wrongCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correctCount++;
    else if (answers[i] !== "Not Answered" && answers[i] !== undefined) wrongCount++;
  });
  let netScore = (correctCount * 1) - (wrongCount * 0.25);

  // 4. THE FIX: Wipe everything inside .resultPage to stop the overlap
  resultPage.innerHTML = `
    <div style="text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px;">
      <h1 style="color: #2c3e50; margin-bottom: 20px;">Quiz Completed!</h1>
      
      <div style="background: white; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 30px; max-width: 400px; margin: 0 auto; border: 1px solid #e1e4e8;">
        <div style="display: flex; justify-content: space-around; margin-bottom: 25px;">
          <div>
            <p style="margin: 0; color: #27ae60; font-weight: bold; font-size: 0.8rem;">CORRECT</p>
            <p style="margin: 5px 0; font-size: 1.5rem; font-weight: bold;">${correctCount}</p>
          </div>
          <div style="border-left: 1px solid #eee;"></div>
          <div>
            <p style="margin: 0; color: #e74c3c; font-weight: bold; font-size: 0.8rem;">WRONG</p>
            <p style="margin: 5px 0; font-size: 1.5rem; font-weight: bold;">${wrongCount}</p>
          </div>
        </div>

        <div style="background: #f8f9fa; border-radius: 15px; padding: 20px;">
          <p style="margin: 0; color: #7f8c8d; font-size: 0.9rem; letter-spacing: 1px;">NET SCORE</p>
          <p style="margin: 10px 0 0 0; font-size: 3.5rem; font-weight: 800; color: #2c3e50;">${netScore.toFixed(2)}</p>
          <p style="margin: 0; color: #bdc3c7;">out of ${questions.length}</p>
        </div>
      </div>

      <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
        <button onclick="location.reload()" style="padding: 12px 25px; border-radius: 50px; border: none; background: #3498db; color: white; font-weight: bold; cursor: pointer;">Replay Quiz</button>
        <button onclick="window.location.href='https://github.com'" style="padding: 12px 25px; border-radius: 50px; border: 1px solid #3498db; background: white; color: #3498db; font-weight: bold; cursor: pointer;">Quit</button>
      </div>

      <div id="reviewBox"></div>
    </div>
  `;

  // 5. Build the Review Slides
  startReview();
}
