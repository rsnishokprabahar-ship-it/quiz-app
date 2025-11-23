//question array
const questions = [
  {
    question: "1. What does HTML stand For?",
    options: [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Markup Hyper Text Language",
    ],
    answer: "Hyper Text Markup Language",
  },
];

document.getElementById("startBtn").addEventListener("click", function () {
  let username = document.getElementById("userName").value;
  document.querySelector(".userText").textContent = username;
  console.log(username);
  document.querySelector(".loginPage").style.display = "none";
  document.querySelector(".quizzPage").style.display = "block";
  setTimerOn();
});

function setTimerOn() {
  let time = 57;
  setInterval(() => {
    document.querySelector(".timer").textContent = `00:${time}`;
    time--;
  }, 1000);
}
