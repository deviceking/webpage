const sectionQuestions = [
    {
      question: "What does HTML stand for?",
      type: "mcq",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyperlinking Text Marking Language"
      ],
      correct: 0
    },
    {
      question: "Which HTML element is used for the largest heading?",
      type: "mcq",
      options: [
        "<heading>",
        "<h1>",
        "<h6>",
        "<head>"
      ],
      correct: 1
    },
    {
      question: "Which property is used to change the background color in CSS?",
      type: "mcq",
      options: [
        "bgcolor",
        "color",
        "background-color",
        "background"
      ],
      correct: 2
    },
    {
      question: "What does CSS stand for?",
      type: "mcq",
      options: [
        "Cascading Style Sheets",
        "Color and Style Sheets",
        "Computer Style Sheets",
        "Creative Style Sheets"
      ],
      correct: 0
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      type: "mcq",
      options: [
        "<javascript>",
        "<js>",
        "<scripting>",
        "<script>"
      ],
      correct: 3
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      type: "mcq",
      options: [
        "alertBox('Hello World');",
        "msg('Hello World');",
        "alert('Hello World');",
        "msgBox('Hello World');"
      ],
      correct: 2
    },
    {
      question: "How do you add a comment in JavaScript?",
      type: "mcq",
      options: [
        "",
        "// This is a comment",
        "' This is a comment",
        "** This is a comment"
      ],
      correct: 1
    },
    {
      question: "What is the correct CSS syntax to make all the p elements bold?",
      type: "mcq",
      options: [
        "<p style='text-size:bold;'>",
        "p {font-weight:bold;}",
        "p {text-size:bold;}",
        "<p style='font-size:bold;'>"
      ],
      correct: 1
    },
    {
      question: "What is the purpose of the `<head>` tag in HTML?",
      type: "mcq",
      options: [
        "To define the content of the page",
        "To contain metadata about the page",
        "To create a new section",
        "To style the page"
      ],
      correct: 1
    },
    {
      question: "How do you create a hyperlink to an external website?",
      type: "mcq",
      options: [
        "<link href='https://example.com'>",
        "<a href='https://example.com'>Link</a>",
        "<url>https://example.com</url>",
        "<website>https://example.com</website>"
      ],
      correct: 1
    },
    {
      question: "What is the difference between `<div>` and `<span>` elements?",
      type: "mcq",
      options: [
        "<div> is block-level, `<span>` is inline",
        "<div> is inline, `<span>` is block-level",
        "Both are block-level",
        "Both are inline"
      ],
      correct: 0
    },
    {
      question: "How do you create a table row in HTML?",
      type: "mcq",
      options: [
        "<table-row>",
        "<tr>",
        "<row>",
        "<tablerow>"
      ],
      correct: 1
    },
    {
      question: "What is the purpose of the `<form>` tag in HTML?",
      type: "mcq",
      options: [
        "To create a table",
        "To define a form for user input",
        "To style the page",
        "To create a new section"
      ],
      correct: 1
    },
    {
      question: "How do you set the color of text to blue?",
      type: "mcq",
      options: [
        "color: blue;",
        "font-color: blue;",
        "text-color: blue;",
        "color: #0000FF;"
      ],
      correct: 0
    },
    {
      question: "What is the CSS property used to control the spacing between words?",
      type: "mcq",
      options: [
        "word-spacing",
        "letter-spacing",
        "text-spacing",
        "spacing"
      ],
      correct: 0
    },
    {
      question: "How do you apply a CSS style to an element using the `class` attribute?",
      type: "mcq",
      options: [
        "<element style='class: myClass'>",
        "<element class='myClass'>",
        "<element id='myClass'>",
        "<element myClass>"
      ],
      correct: 1
    },
    {
      question: "What is the CSS property used to control the alignment of text within an element?",
      type: "mcq",
      options: [
        "text-align",
        "align-text",
        "text-position",
        "position"
      ],
      correct: 0
    },
    {
      question: "How do you create a CSS class?",
      type: "mcq",
      options: [
        ".myClass { ... }",
        "#myClass { ... }",
        "<myClass> { ... }",
        "class myClass { ... }"
      ],
      correct: 0
    }
  ];

let currentQuestionIndex = 0;
const quizContent = document.querySelector('.quiz-content');
const quizQuestion = document.querySelector('.quiz-question');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const intro = document.getElementById('intro');
const startBtn = document.getElementById('start-btn');
const progressBar = document.querySelector('.progress');
const feedback = document.getElementById('feedback');
const themeCheckbox = document.getElementById('theme-toggle-checkbox');
const themeLabel = document.getElementById('theme-label');

function loadQuestion() {
    const currentQuestions = sectionQuestions;
    if (currentQuestionIndex >= currentQuestions.length) {
        finishQuiz();
        return;
    }

    const currentQuestion = currentQuestions[currentQuestionIndex];
    quizQuestion.innerHTML = generateQuestionHTML(currentQuestion);

    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    nextBtn.classList.toggle('hidden', currentQuestionIndex >= currentQuestions.length - 1);
    finishBtn.classList.add('hidden');

    if (currentQuestionIndex === currentQuestions.length - 1) {
        nextBtn.classList.add('hidden');
        finishBtn.classList.remove('hidden');
    }

    updateProgressBar();
}

function handleNavigation(direction) {
    feedback.classList.add("hidden");
    feedback.textContent = "";

    if (direction === 'next' && currentQuestionIndex < sectionQuestions.length - 1) {
        currentQuestionIndex++;
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }
    loadQuestion();
}

function generateQuestionHTML(question) {
    let html = `<h2>${question.question.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</h2>`;

    if (question.type === 'mcq') {
        html += `<ul>`;
        question.options.forEach((option, index) => {
            html += `
                <li>
                    <input type="radio" name="answer" value="${index}" id="option${index}" onchange="checkAnswer(event)">
                    <label for="option${index}">${option.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</label>
                </li>`;
        });
        html += `</ul>`;
    }

    return html;
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / sectionQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function checkAnswer(event) {
    let isCorrect = false;
    const question = sectionQuestions[currentQuestionIndex];

    if (question.type === 'mcq') {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value);
            isCorrect = answerIndex === question.correct;
        }
    }

    feedback.classList.toggle('correct', isCorrect);
    feedback.classList.toggle('wrong', !isCorrect);
    feedback.textContent = isCorrect ? 'Correct!' : 'Wrong.';
    feedback.classList.remove("hidden");
}

function finishQuiz() {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('quizTheme', currentTheme);
    window.location.href = 'Completion.html';
}

startBtn.addEventListener('click', () => {
    intro.classList.add('hidden');
    setTimeout(() => {
        intro.style.display = 'none';
        quizContent.classList.remove('hidden');
        quizQuestion.classList.add("visible");
        loadQuestion();
    }, 500);
});

nextBtn.addEventListener('click', () => handleNavigation('next'));
prevBtn.addEventListener('click', () => handleNavigation('prev'));
finishBtn.addEventListener('click', () => finishQuiz());

window.onload = loadQuestion;

themeCheckbox.addEventListener('change', () => {
    const isDarkMode = themeCheckbox.checked;
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('light', !isDarkMode);
    themeLabel.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('quizTheme', isDarkMode ? 'dark' : 'light');
});