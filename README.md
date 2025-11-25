# Quiz App 🎯

A simple, fast, and clean JavaScript quiz app. Add questions, start the quiz, beat the timer, and get your score instantly.

## 🌟 Features

- Timed questions (30s each)
- Multiple-choice answers
- Live question counter
- Score summary at the end
- Replay option
- Mobile-friendly UI

## 🚀 Demo


### Screenshots
![alt text](/assets/screenshots/image.png)
![alt text](/assets/screenshots/image-2.png)
![alt text](/assets/screenshots/image-3.png)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/dinukaly/quiz-app.git
```

2. Navigate to the project directory:
```bash
cd quiz-app
```

3. Start a local server (any of these works):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

4. Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
quiz-app/
│── index.html
│── styles.css
│── script.js
│── questions.json
└── assets/

##✏️ Add Your Own Questions

Edit questions.json:

[
  {
    "number": 1,
    "question": "What does HTML stand for?",
    "options": [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Markup Hyper Text Language"
    ],
    "answer": "Hyper Text Markup Language"
  }
]
```

**Happy Quizzing! 🎉**

*Made with ❤️ using HTML, CSS and JavaScript*