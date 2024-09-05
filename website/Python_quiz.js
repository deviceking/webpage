const sectionQuestions = [
    {
        question: "What is the correct way to create a function in Python?",
        type: "mcq",
        options: [
            "function myFunction():",
            "def myFunction():",
            "create myFunction()",
            "def myFunction[]:"
        ],
        correct: 1
    },
    {
        question: "Which of the following is not a Python data type?",
        type: "mcq",
        options: [
            "String",
            "Integer",
            "Boolean",
            "Character"
        ],
        correct: 3
    },
    {
        question: "Which keyword is used to create a class in Python?",
        type: "mcq",
        options: [
            "class",
            "def",
            "new",
            "create"
        ],
        correct: 0
    },
    {
        question: "What symbol is used to begin a comment in Python?",
        type: "mcq",
        options: [
            "#",
            "//",
            "/*",
            "<!--"
        ],
        correct: 0
    },
    {
        question: "Which function is used to get the length of a list in Python?",
        type: "mcq",
        options: [
            "length()",
            "len()",
            "size()",
            "count()"
        ],
        correct: 1
    },
    {
        question: "What is the output of 'print(\"Hello\\nWorld\")' in Python?",
        type: "mcq",
        options: [
            "Hello\\nWorld",
            "Hello World",
            "Hello World",
            "Hello\\n World"
        ],
        correct: 0
    },
    {
        question: "How do you start a for loop in Python?",
        type: "mcq",
        options: [
            "for (i = 0; i < 10; i++)",
            "foreach item in list",
            "for i in range(10)",
            "for (i: list)"
        ],
        correct: 2
    },
    {
        question: "What is the correct file extension for Python files?",
        type: "mcq",
        options: [
            ".pyth",
            ".pt",
            ".pyt",
            ".py"
        ],
        correct: 3
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
    let html = `<h2>${question.question}</h2>`;

    if (question.type === 'mcq') {
        html += `<ul>`;
        question.options.forEach((option, index) => {
            html += `
                <li>
                    <input type="radio" name="answer" value="${index}" id="option${index}" onchange="checkAnswer(event)">
                    <label for="option${index}">${option}</label>
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
    window.location.href = 'completion.html';
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