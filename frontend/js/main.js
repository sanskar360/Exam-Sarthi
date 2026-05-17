// Shared helpers used across pages.
const STORAGE_KEYS = {
  users: "examsarthi_users",
  currentUser: "examsarthi_current_user",
  results: "examsarthi_results",
  selectedExam: "examsarthi_selected_exam",
  activeAnswers: "examsarthi_active_answers"
};

function getJSON(key, fallback) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  return getJSON(STORAGE_KEYS.currentUser, null);
}

function getResults() {
  return getJSON(STORAGE_KEYS.results, []);
}

function saveResult(result) {
  const results = getResults();
  results.push(result);
  setJSON(STORAGE_KEYS.results, results);
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "logoutLink") {
    logoutUser();
  }
});
