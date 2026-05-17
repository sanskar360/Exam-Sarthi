const exams = [
  { id: "jee", name: "JEE Full Mock Test", category: "JEE", duration: "180 minutes", durationMinutes: 180, difficulty: "Hard", questions: 20 },
  { id: "neet", name: "NEET Full Mock Test", category: "NEET", duration: "200 minutes", durationMinutes: 200, difficulty: "Medium", questions: 20 },
  { id: "gate", name: "GATE Full Mock Test", category: "GATE", duration: "180 minutes", durationMinutes: 180, difficulty: "Hard", questions: 20 },
  { id: "mhtcet", name: "MHTCET Full Mock Test", category: "MHTCET", duration: "180 minutes", durationMinutes: 180, difficulty: "Medium", questions: 20 },
  { id: "nda", name: "NDA Full Mock Test", category: "NDA", duration: "150 minutes", durationMinutes: 150, difficulty: "Medium", questions: 20 }
];

const examCards = document.getElementById("examCards");
const searchInput = document.getElementById("examSearch");
let activeFilter = "all";

function startExam(examId) {
  const selectedExam = exams.find(exam => exam.id === examId);
  setJSON(STORAGE_KEYS.selectedExam, selectedExam);
  localStorage.removeItem(STORAGE_KEYS.activeAnswers);
  window.location.href = "exam.html";
}

function renderExams() {
  const searchText = searchInput.value.toLowerCase();
  const visibleExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchText) || exam.category.toLowerCase().includes(searchText);
    const matchesFilter = activeFilter === "all" || exam.category.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  examCards.innerHTML = visibleExams.map(exam => `
    <div class="col-md-6 col-xl-4">
      <article class="exam-card ${exam.id}">
        <div class="exam-card-head">
          <span class="exam-icon">${exam.category.slice(0, 2)}</span>
          <span class="section-label">${exam.category}</span>
        </div>
        <h2 class="h5 fw-bold mt-3">${exam.name}</h2>
        <div class="exam-meta">
          <span>Duration: ${exam.duration}</span>
          <span>Difficulty: ${exam.difficulty}</span>
          <span>Questions: ${exam.questions}</span>
        </div>
        <button class="btn btn-primary rounded-pill w-100" onclick="startExam('${exam.id}')">Start Exam</button>
      </article>
    </div>
  `).join("") || `<p class="text-secondary">No exams found.</p>`;
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", function () {
    activeFilter = this.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline-primary");
    });
    this.classList.add("btn-primary");
    this.classList.remove("btn-outline-primary");
    renderExams();
  });
});

searchInput.addEventListener("input", renderExams);
renderExams();
