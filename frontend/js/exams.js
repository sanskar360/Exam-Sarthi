const examCards =
document.getElementById("examCards");

const searchInput =
document.getElementById("examSearch");

let activeFilter = "all";

let exams = [];

async function loadExams(){

    try{

        const examFiles = [

            "/Exam-Sarthi/backend/data/jee_2026_questions.json",

            "/Exam-Sarthi/backend/data/jee_2026_shift2_questions.json",

            "/Exam-Sarthi/backend/data/mht_cet_2025_questions.json",

            "/Exam-Sarthi/backend/data/NDA_2025_GAT_questions.json",

            "/Exam-Sarthi/backend/data/NDA_2025_maths_questions.json",

            "/Exam-Sarthi/backend/data/neet_2026_questions.json"
        ];

        const responses =
        await Promise.all(

            examFiles.map(
                file => fetch(file)
            )
        );

        exams =
        await Promise.all(

            responses.map(
                response => response.json()
            )
        );

        renderExams();

    } catch(error){

        console.log(
            "Error loading exams",
            error
        );
    }
}

function startExam(examId){

    let selectedExam =
    exams.find(
        exam => exam.id == examId
    );

    localStorage.setItem(
        "selectedExam",
        JSON.stringify(selectedExam)
    );

    localStorage.removeItem(
        "activeAnswers"
    );

    window.location.href =
    "exam.html";
}

function renderExams(){

    let searchText =
    searchInput.value.toLowerCase();

    let visibleExams =
    exams.filter(exam => {

        let matchesSearch =

            exam.exam
            .toLowerCase()
            .includes(searchText)

            ||

            exam.examType
            .toLowerCase()
            .includes(searchText);

        let matchesFilter =

            activeFilter === "all"

            ||

            exam.examType === activeFilter;

        return (
            matchesSearch &&
            matchesFilter
        );
    });

    examCards.innerHTML =

    visibleExams.map(exam => `

        <div class="col-md-6 col-xl-4">

            <article class="exam-card">

                <div class="exam-card-head">

                    <span class="exam-icon">

                        ${exam.examType.slice(0,2)}

                    </span>

                    <span class="section-label">

                        ${exam.examType}

                    </span>

                </div>

                <h2 class="h5 fw-bold mt-3">

                    ${exam.exam}

                </h2>

                <div class="exam-meta">

                    <span>
                        Duration:
                        ${exam.duration} mins
                    </span>

                    <span>
                        Total:
                        ${exam.totalMarks}
                    </span>

                    <span>
                        Year:
                        ${exam.date}
                    </span>

                </div>

                <button
                  class="btn btn-primary rounded-pill w-100"
                  onclick="startExam(${exam.id})"
                >
                  Start Exam
                </button>

            </article>

        </div>

    `).join("")

    ||

    `<p class="text-secondary">
        No exams found.
    </p>`;
}

document
.querySelectorAll(".filter-btn")
.forEach(button => {

    button.addEventListener(
        "click",

        function(){

            activeFilter =
            this.dataset.filter;

            document
            .querySelectorAll(".filter-btn")
            .forEach(btn => {

                btn.classList.remove(
                    "btn-primary"
                );

                btn.classList.add(
                    "btn-outline-primary"
                );
            });

            this.classList.add(
                "btn-primary"
            );

            this.classList.remove(
                "btn-outline-primary"
            );

            renderExams();
        }
    );
});

searchInput.addEventListener(
    "input",
    renderExams
);

loadExams();