const selectedExam = getJSON(STORAGE_KEYS.selectedExam, {
  id: "jee",
  name: "JEE Full Mock Test",
  duration: "180 minutes",
  durationMinutes: 180
});

function q(text, options, answer) {
  return { text, options, answer };
}

const questionPapers = {
  jee: [
    q("A particle starts from rest with acceleration 2 m/s2. What is its speed after 5 seconds?", ["5 m/s", "10 m/s", "20 m/s", "25 m/s"], 1),
    q("The SI unit of electric resistance is:", ["Volt", "Ampere", "Ohm", "Watt"], 2),
    q("If the radius of a circle is 7 cm, its area is approximately:", ["44 cm2", "154 cm2", "308 cm2", "49 cm2"], 1),
    q("The value of sin 30 degrees is:", ["0", "1/2", "1", "sqrt(3)/2"], 1),
    q("Which gas is evolved when zinc reacts with dilute HCl?", ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"], 2),
    q("The derivative of x3 with respect to x is:", ["x2", "2x", "3x2", "3x"], 2),
    q("A convex lens is mainly used to correct:", ["Myopia", "Hypermetropia", "Astigmatism only", "Color blindness"], 1),
    q("Which quantum number describes the shape of an orbital?", ["Principal", "Azimuthal", "Magnetic", "Spin"], 1),
    q("The determinant of [[1,2],[3,4]] is:", ["-2", "2", "10", "-10"], 0),
    q("The work done when force is perpendicular to displacement is:", ["Maximum", "Minimum", "Zero", "Negative always"], 2),
    q("Which compound is an alcohol?", ["CH3OH", "CH4", "CO2", "NaCl"], 0),
    q("If log10 1000 equals x, then x is:", ["1", "2", "3", "10"], 2),
    q("The dimensional formula of force is:", ["MLT-1", "MLT-2", "ML2T-2", "M0LT-2"], 1),
    q("Which is the strongest acid among the following?", ["HCl", "HF", "HBr", "HI"], 3),
    q("The roots of x2 - 5x + 6 = 0 are:", ["1 and 6", "2 and 3", "-2 and -3", "5 and 6"], 1),
    q("Kirchhoff's current law is based on conservation of:", ["Energy", "Charge", "Momentum", "Mass"], 1),
    q("Benzene has how many pi electrons?", ["2", "4", "6", "8"], 2),
    q("The slope of line y = 3x + 4 is:", ["3", "4", "7", "1"], 0),
    q("Escape velocity from Earth is about:", ["1.1 km/s", "5.6 km/s", "11.2 km/s", "22.4 km/s"], 2),
    q("Which method separates two miscible liquids with different boiling points?", ["Filtration", "Distillation", "Sublimation", "Chromatography"], 1)
  ],
  neet: [
    q("The functional unit of kidney is:", ["Neuron", "Nephron", "Alveolus", "Villus"], 1),
    q("Which vitamin is synthesized in skin by sunlight?", ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], 3),
    q("The powerhouse of the cell is:", ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], 1),
    q("A body moving in a circle has acceleration directed towards:", ["Tangent", "Center", "Outside", "Zero"], 1),
    q("The pH of a neutral solution at 25 C is:", ["0", "5", "7", "14"], 2),
    q("Which blood cells help in clotting?", ["RBC", "WBC", "Platelets", "Plasma"], 2),
    q("The human heart has how many chambers?", ["2", "3", "4", "5"], 2),
    q("Which hormone regulates blood glucose level?", ["Thyroxine", "Insulin", "Adrenaline", "Estrogen"], 1),
    q("The SI unit of power is:", ["Joule", "Watt", "Newton", "Pascal"], 1),
    q("The chemical formula of glucose is:", ["C6H12O6", "C2H5OH", "CH4", "C12H22O11"], 0),
    q("Photosynthesis mainly occurs in:", ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"], 1),
    q("Which part of brain controls balance?", ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], 1),
    q("Ohm's law is:", ["V = IR", "P = VI", "F = ma", "Q = It"], 0),
    q("Which is a noble gas?", ["Oxygen", "Nitrogen", "Argon", "Hydrogen"], 2),
    q("DNA contains the sugar:", ["Ribose", "Glucose", "Deoxyribose", "Fructose"], 2),
    q("The site of protein synthesis is:", ["Ribosome", "Lysosome", "Nucleus", "Vacuole"], 0),
    q("The unit of frequency is:", ["Newton", "Hertz", "Tesla", "Weber"], 1),
    q("Which acid is present in vinegar?", ["Acetic acid", "Citric acid", "Lactic acid", "Sulfuric acid"], 0),
    q("In humans, fertilization usually occurs in:", ["Uterus", "Ovary", "Fallopian tube", "Cervix"], 2),
    q("The oxygen carrying pigment in blood is:", ["Chlorophyll", "Hemoglobin", "Myoglobin", "Insulin"], 1)
  ],
  gate: [
    q("For a stable LTI system, all poles of the transfer function must lie in:", ["Right half plane", "Left half plane", "On imaginary axis", "At origin only"], 1),
    q("The Laplace transform of 1 is:", ["1", "s", "1/s", "s2"], 2),
    q("In C language, an array index starts from:", ["-1", "0", "1", "Depends on compiler"], 1),
    q("The time complexity of binary search is:", ["O(n)", "O(log n)", "O(n log n)", "O(n2)"], 1),
    q("A full adder has how many inputs?", ["1", "2", "3", "4"], 2),
    q("The unit of capacitance is:", ["Henry", "Farad", "Ohm", "Tesla"], 1),
    q("Which protocol is used for reliable transport in networks?", ["UDP", "TCP", "IP", "ARP"], 1),
    q("A primary key in DBMS must be:", ["Duplicate", "Null", "Unique and not null", "Only numeric"], 2),
    q("The Fourier transform converts a signal from time domain to:", ["Space domain", "Frequency domain", "Voltage domain", "Current domain"], 1),
    q("For an ideal op-amp, input impedance is:", ["Zero", "Very low", "Infinite", "Equal to output impedance"], 2),
    q("Which data structure follows FIFO?", ["Stack", "Queue", "Tree", "Graph"], 1),
    q("The gradient of a scalar field gives:", ["Scalar only", "Vector", "Matrix", "Constant only"], 1),
    q("In operating systems, deadlock requires:", ["Mutual exclusion", "No resources", "Only one process", "No waiting"], 0),
    q("The binary equivalent of decimal 10 is:", ["1000", "1001", "1010", "1110"], 2),
    q("Which gate gives output 1 only when all inputs are 1?", ["OR", "AND", "XOR", "NOR"], 1),
    q("The rank of an identity matrix of order 3 is:", ["0", "1", "2", "3"], 3),
    q("Nyquist sampling rate is twice the:", ["Minimum frequency", "Maximum frequency", "Average frequency", "Signal power"], 1),
    q("Which scheduling algorithm may cause starvation?", ["Round Robin", "FCFS", "Priority scheduling", "FIFO"], 2),
    q("Thevenin equivalent contains:", ["Current source only", "Voltage source and series resistance", "Voltage source and parallel resistance", "Capacitor only"], 1),
    q("In SQL, command used to remove all rows from a table quickly is:", ["DROP", "DELETE DATABASE", "TRUNCATE", "ALTER"], 2)
  ],
  mhtcet: [
    q("The value of cos 0 degrees is:", ["0", "1", "-1", "1/2"], 1),
    q("Which law states that pressure of a gas is inversely proportional to volume at constant temperature?", ["Charles law", "Boyle law", "Ohm law", "Faraday law"], 1),
    q("The SI unit of energy is:", ["Watt", "Joule", "Newton", "Volt"], 1),
    q("Which metal is liquid at room temperature?", ["Iron", "Mercury", "Copper", "Aluminium"], 1),
    q("The solution of x + 5 = 12 is:", ["5", "6", "7", "12"], 2),
    q("The acceleration due to gravity on Earth is approximately:", ["4.9 m/s2", "9.8 m/s2", "19.6 m/s2", "1.6 m/s2"], 1),
    q("Which is an example of a scalar quantity?", ["Velocity", "Force", "Speed", "Acceleration"], 2),
    q("The molecular formula of water is:", ["H2O", "CO2", "O2", "H2"], 0),
    q("If A = {1,2,3}, number of elements in A is:", ["1", "2", "3", "4"], 2),
    q("The mirror used as a rear-view mirror in vehicles is:", ["Plane", "Concave", "Convex", "Cylindrical"], 2),
    q("Atomic number is equal to number of:", ["Neutrons", "Protons", "Molecules", "Shells"], 1),
    q("The derivative of sin x is:", ["cos x", "-cos x", "tan x", "-sin x"], 0),
    q("Which device converts electrical energy into mechanical energy?", ["Generator", "Motor", "Transformer", "Battery"], 1),
    q("The gas used by plants in photosynthesis is:", ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], 2),
    q("The midpoint of points (0,0) and (4,6) is:", ["(2,3)", "(4,6)", "(1,2)", "(3,2)"], 0),
    q("The valency of sodium is:", ["1", "2", "3", "4"], 0),
    q("Frequency is measured in:", ["Meter", "Hertz", "Ampere", "Kelvin"], 1),
    q("The formula for kinetic energy is:", ["mgh", "1/2 mv2", "F/A", "IR"], 1),
    q("Which is a strong electrolyte?", ["Sugar solution", "Distilled water", "NaCl solution", "Alcohol"], 2),
    q("If two lines are parallel, their slopes are:", ["Equal", "Product -1", "Zero always", "Undefined always"], 0)
  ],
  nda: [
    q("The capital of India is:", ["Mumbai", "New Delhi", "Kolkata", "Chennai"], 1),
    q("The largest ocean in the world is:", ["Atlantic", "Indian", "Pacific", "Arctic"], 2),
    q("Who was the first President of India?", ["Dr Rajendra Prasad", "Jawaharlal Nehru", "Sardar Patel", "APJ Abdul Kalam"], 0),
    q("The value of 25 percent of 200 is:", ["25", "40", "50", "75"], 2),
    q("The synonym of brave is:", ["Cowardly", "Courageous", "Weak", "Silent"], 1),
    q("The Indian Army Day is observed on:", ["15 January", "26 January", "15 August", "2 October"], 0),
    q("The square root of 144 is:", ["10", "11", "12", "14"], 2),
    q("Which river is known as the Ganga of the South?", ["Krishna", "Godavari", "Kaveri", "Narmada"], 1),
    q("The chemical symbol of gold is:", ["Ag", "Au", "Gd", "Go"], 1),
    q("A triangle has angles 60, 60 and:", ["30", "45", "60", "90"], 2),
    q("Choose the correct spelling:", ["Definately", "Definitely", "Definetly", "Definatly"], 1),
    q("The highest battlefield in the world is:", ["Kargil", "Siachen", "Doklam", "Tawang"], 1),
    q("The currency of Japan is:", ["Dollar", "Yen", "Euro", "Won"], 1),
    q("If 8 men finish work in 10 days, 4 men will finish it in:", ["5 days", "10 days", "15 days", "20 days"], 3),
    q("The national animal of India is:", ["Lion", "Tiger", "Elephant", "Leopard"], 1),
    q("Which planet is called the Red Planet?", ["Venus", "Mars", "Jupiter", "Saturn"], 1),
    q("The antonym of ancient is:", ["Old", "Modern", "Historic", "Past"], 1),
    q("The perimeter of a square of side 6 cm is:", ["12 cm", "18 cm", "24 cm", "36 cm"], 2),
    q("Who wrote the Indian national anthem?", ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Mahatma Gandhi", "Sarojini Naidu"], 1),
    q("The headquarters of NDA is located at:", ["Dehradun", "Khadakwasla", "Pune Camp", "Delhi Cantt"], 1)
  ]
};

const questions = questionPapers[selectedExam.id] || questionPapers.jee;

let currentIndex = 0;
let answers = getJSON(STORAGE_KEYS.activeAnswers, {});
let remainingSeconds = (selectedExam.durationMinutes || 180) * 60;

const examTitle = document.getElementById("examTitle");
const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const questionPalette = document.getElementById("questionPalette");
const timer = document.getElementById("examTimer");

examTitle.textContent = selectedExam.name;

function saveAnswers() {
  setJSON(STORAGE_KEYS.activeAnswers, answers);
}

function renderQuestion() {
  const question = questions[currentIndex];
  questionCounter.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionText.textContent = question.text;
  optionsList.innerHTML = question.options.map((option, optionIndex) => `
    <div class="option-item ${answers[currentIndex] === optionIndex ? "selected" : ""}" data-option="${optionIndex}">
      <strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${option}
    </div>
  `).join("");

  document.querySelectorAll(".option-item").forEach(item => {
    item.addEventListener("click", function () {
      answers[currentIndex] = Number(this.dataset.option);
      saveAnswers();
      renderQuestion();
      renderPalette();
    });
  });

  document.getElementById("prevBtn").disabled = currentIndex === 0;
  document.getElementById("nextBtn").textContent = currentIndex === questions.length - 1 ? "Review" : "Next";
}

function renderPalette() {
  questionPalette.innerHTML = questions.map((_, index) => `
    <button class="${answers[index] !== undefined ? "answered" : ""} ${index === currentIndex ? "current" : ""}" data-index="${index}">
      ${index + 1}
    </button>
  `).join("");

  questionPalette.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
      currentIndex = Number(this.dataset.index);
      renderQuestion();
      renderPalette();
    });
  });
}

function submitTest() {
  let score = 0;
  questions.forEach((question, index) => {
    if (answers[index] === question.answer) score++;
  });

  const percentage = Math.round((score / questions.length) * 100);
  saveResult({
    examName: selectedExam.name,
    score,
    total: questions.length,
    percentage,
    accuracy: percentage,
    date: new Date().toLocaleDateString("en-IN")
  });
  localStorage.removeItem(STORAGE_KEYS.activeAnswers);
  alert(`Test submitted. Your score is ${score}/${questions.length}.`);
  window.location.href = "analytics.html";
}

function updateTimer() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
  const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;

  if (remainingSeconds <= 0) {
    submitTest();
    return;
  }
  remainingSeconds--;
}

document.getElementById("prevBtn").addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
    renderPalette();
  }
});

document.getElementById("nextBtn").addEventListener("click", function () {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
    renderPalette();
  }
});

document.getElementById("submitTestBtn").addEventListener("click", submitTest);
document.getElementById("endExamBtn").addEventListener("click", submitTest);

renderQuestion();
renderPalette();
updateTimer();
setInterval(updateTimer, 1000);
