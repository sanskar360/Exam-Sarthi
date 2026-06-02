const selectedExam =
JSON.parse(
    localStorage.getItem(
        "selectedExam"
    )
);

if(!selectedExam){
    window.location.href =
    "exams.html";
}

const questions =
selectedExam.questions;

let currentIndex = 0;

let answers =
JSON.parse(
    localStorage.getItem(
        "activeAnswers"
    )
) || {};

let remainingSeconds =
(selectedExam.duration || 180) * 60;

const examTitle =
document.getElementById("examTitle");

const questionCounter =
document.getElementById("questionCounter");

const questionText =
document.getElementById("questionText");

const optionsList =
document.getElementById("optionsList");

const questionPalette =
document.getElementById("questionPalette");

const timer =
document.getElementById("examTimer");

examTitle.textContent =
selectedExam.exam;

function saveAnswers(){

    localStorage.setItem(

        "activeAnswers",

        JSON.stringify(answers)
    );
}

function renderQuestion(){

    let question =
    questions[currentIndex];

    questionCounter.textContent =

        `Question ${currentIndex + 1}
        of ${questions.length}`;

    questionText.textContent =
    question.question;

    if(question.type === "mcq"){

        optionsList.innerHTML =

        question.options.map(
            (option, optionIndex) => `

            <div
                class="option-item

                ${answers[currentIndex]
                === optionIndex
                ? "selected" : ""}"

                data-option="${optionIndex}"
            >

                <strong>
                    ${String.fromCharCode(
                        65 + optionIndex
                    )}.
                </strong>

                ${option}

            </div>

        `).join("");

        document
        .querySelectorAll(".option-item")
        .forEach(item => {

            item.addEventListener(
                "click",

                function(){

                    answers[currentIndex] =

                    Number(
                        this.dataset.option
                    );

                    saveAnswers();

                    renderQuestion();

                    renderPalette();
                }
            );
        });

    } else {

        optionsList.innerHTML = `

            <input
                type="number"

                class="form-control"

                placeholder="Enter answer"

                value="${answers[currentIndex] || ""}"

                id="numericalAnswer"
            >
        `;

        document
        .getElementById(
            "numericalAnswer"
        )

        .addEventListener(
            "input",

            function(){

                answers[currentIndex] =
                this.value;

                saveAnswers();

                renderPalette();
            }
        );
    }

    document.getElementById(
        "prevBtn"
    ).disabled =
    currentIndex === 0;

    document.getElementById(
        "nextBtn"
    ).textContent =

    currentIndex ===
    questions.length - 1

    ?

    "Review"

    :

    "Next";
}

function renderPalette(){

    questionPalette.innerHTML =

    questions.map(
        (_, index) => `

        <button

            class="

            ${answers[index]
            !== undefined
            ? "answered" : ""}

            ${index === currentIndex
            ? "current" : ""}
            "

            data-index="${index}"
        >

            ${index + 1}

        </button>

    `).join("");

    questionPalette
    .querySelectorAll("button")

    .forEach(button => {

        button.addEventListener(
            "click",

            function(){

                currentIndex =

                Number(
                    this.dataset.index
                );

                renderQuestion();

                renderPalette();
            }
        );
    });
}

function submitTest(){

    let score = 0;

    questions.forEach(
        (question, index) => {

        if(question.type === "mcq"){

            let correctIndex =

            question.options.indexOf(
                question.correctAnswer
            );

            if(
                answers[index]
                === correctIndex
            ){

                score += question.marks;

            } else if(
                answers[index]
                !== undefined
            ){

                score -=
                question.negativeMarks;
            }

        } else {

            if(

                answers[index]
                == question.correctAnswer

            ){

                score += question.marks;
            }
        }
    });

    let percentage =

    Math.round(

        (
            score /
            selectedExam.totalMarks
        ) * 100
    );

    let totalTime =
    selectedExam.duration * 60;

    let timeTakenSeconds =
    totalTime - remainingSeconds;

    let minutesTaken =
    Math.floor(timeTakenSeconds / 60);

    let secondsTaken =
    timeTakenSeconds % 60;

    let results =
    JSON.parse(
        localStorage.getItem(
            "results"
        )
    ) || [];

    let currentUser =
    JSON.parse(
        localStorage.getItem(
            "loggedInUser"
        )
    );

    results.push({

        userId:
        currentUser.id,

        examName:
        selectedExam.exam,

        score,

        total:
        selectedExam.totalMarks,

        percentage,

        timeTaken:

        `${minutesTaken}m ${secondsTaken}s`,

        date:
        new Date()
        .toLocaleDateString("en-IN")
    });

    localStorage.setItem(

        "results",

        JSON.stringify(results)
    );

    localStorage.removeItem(
        "activeAnswers"
    );

    alert(

        `Test submitted.
        Score: ${score}`
    );

    window.location.href =
    "dashboard.html";
}

function updateTimer(){

    let minutes =

    Math.floor(
        remainingSeconds / 60
    )

    .toString()

    .padStart(2, "0");

    let seconds =

    (remainingSeconds % 60)

    .toString()

    .padStart(2, "0");

    timer.textContent =

    `${minutes}:${seconds}`;

    if(remainingSeconds <= 0){

        submitTest();

        return;
    }

    remainingSeconds--;
}

document
.getElementById("prevBtn")

.addEventListener(
    "click",

    function(){

        if(currentIndex > 0){

            currentIndex--;

            renderQuestion();

            renderPalette();
        }
    }
);

document
.getElementById("nextBtn")

.addEventListener(
    "click",

    function(){

        if(
            currentIndex <
            questions.length - 1
        ){

            currentIndex++;

            renderQuestion();

            renderPalette();
        }
    }
);

document
.getElementById("submitTestBtn")

.addEventListener(
    "click",
    submitTest
);

document
.getElementById("endExamBtn")

.addEventListener(
    "click",
    submitTest
);

renderQuestion();

renderPalette();

updateTimer();

setInterval(
    updateTimer,
    1000
);