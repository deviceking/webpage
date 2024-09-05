const sectionQuestions = [
  {
    question: "What does OOP stand for in C++?",
    type: "mcq",
    options: ["Object Oriented Programming", "Overloaded Operator Programming", "Object-Oriented Principles", "Only One Possibility"],
    correct: 0
  },
  {
    question: "Which keyword is used to define a class in C++?",
    type: "mcq",
    options: ["class", "struct", "define", "create"],
    correct: 0
  },
  {
    question: "What is the difference between a public and private member in a class?",
    type: "mcq",
    options: ["Public members are accessible from anywhere, private members are only accessible within the class", "Public members are constants, private members are variables", "Public members can be inherited, private members cannot", "There is no difference"],
    correct: 0
  },
  {
    question: "What is the purpose of a constructor in C++?",
    type: "mcq",
    options: ["To define the behavior of an object", "To initialize the data members of an object", "To create a copy of an existing object", "To destroy an object"],
    correct: 1
  },
  {
    question: "What is the difference between a pointer and a reference in C++?",
    type: "mcq",
    options: ["A pointer stores the memory address, a reference is an alias for an existing variable", "A pointer can be null, a reference cannot", "Pointers can be reassigned, references cannot", "There is no difference"],
    correct: 0
  },
  {
    question: "What does the `new` keyword do in C++?",
    type: "mcq",
    options: ["Allocates memory dynamically on the heap", "Creates a new object", "Both A and B", "Neither A nor B"],
    correct: 2
  },
  {
    question: "What is the correct way to delete memory allocated with `new` in C++?",
    type: "mcq",
    options: ["free()", "delete", "remove()", "clear()"],
    correct: 1
  },
  {
    question: "What is the difference between inheritance and polymorphism in C++?",
    type: "mcq",
    options: ["Inheritance allows code reuse, polymorphism allows objects of different types to be treated similarly", "Inheritance defines a relationship between classes, polymorphism defines the behavior of objects", "There is no difference", "Inheritance creates new objects, polymorphism modifies existing objects"],
    correct: 0
  },
  {
    question: "What does the `virtual` keyword do in C++?",
    type: "mcq",
    options: ["Enables polymorphism", "Prevents accidental modification of member functions", "Marks a function as pure virtual", "All of the above"],
    correct: 3
  },
  {
    question: "What is the output of the following code snippet? `c++ int x = 5; int y = 10; std::cout << x + y << std::endl; `",
    type: "code",
    correct: 15 // The answer is the sum, which is 15
  },
  {
    question: "What is the purpose of the `using namespace std;` statement in C++?",
    type: "mcq",
    options: ["Avoids writing `std::` before standard library elements", "Defines new keywords", "Increases code readability", "None of the above"],
    correct: 0
  },
  {
    question: "What is the difference between a header file and a source file in C++?",
    type: "mcq",
    options: ["Header files contain function prototypes and class declarations, source files contain function definitions and object implementations", "Header files are compiled first, source files are compiled later", "Both A and B", "There is no difference"],
    correct: 0
  },
  {
    question: "What is the purpose of the preprocessor directive `#include` in C++?",
    type: "mcq",
    options: ["Includes header files", "Defines macros", "Compiles specific sections of code", "All of the above"],
    correct: 0
  },
]

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