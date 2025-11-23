fetch("questions.json")
  .then((repoonse) => repoonse.json())
  .then((data) => {
    questions = data;
    console.log(data);
    console.log(questions.length);
  })
  .catch((error) => console.error(error));

document.getElementById("startBtn").addEventListener("click", function () {
  let username = document.getElementById("userName").value;
  document.querySelector(".userText").textContent = username;
  console.log(username);
  document.querySelector(".loginPage").style.display = "none";
  document.querySelector(".quizzPage").style.display = "block";
  setTimerOn();
  setQuestionStats();
  loadQuestions();
});

document.querySelector(".nextBtn").addEventListener("click", function () {
  index++;
  setQuestionStats();
  loadQuestions();
});

//set question stats
function setQuestionStats() {
  document.getElementById("questionStat").textContent = `${index + 1}/${
    questions.length
  }`;
}

function setTimerOn() {
  let time = 10;
    const intervalId = setInterval(() => {
      if(time==-1){
        clearInterval(intervalId);
        index++;
        loadQuestions();
        setQuestionStats();
        setTimerOn();
      }else{
        document.querySelector(".timer").textContent = `00:${time}`;
        time--;
      }
    }, 1000);

}

function loadQuestions() {
  document.querySelector(".quizzContainer").innerHTML = `
       <div class="questionText">
            <p>${questions[index].question}</p>
          </div>
          
          <div class="quizes">
            <div class="questions">
              <label>
                <input type="radio" name="question${index}" />
                ${questions[index].options[0]}
              </label>
            </div>
            <div class="questions">
              <label>
                <input type="radio" name="question${index}" />
                ${questions[index].options[1]}
              </label>
            </div>
            <div class="questions">
              <label>
                <input type="radio" name="question${index}" />
                ${questions[index].options[2]}
              </label>
            </div>
            <div class="questions">
              <label>
                <input type="radio" name="question${index}" />
                ${questions[index].options[3]}
              </label>
            </div>
          </div>
  `;
}

let questions;
let index = 0;
