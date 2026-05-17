const settingsUser = getCurrentUser();
const savedSettings = getJSON("examsarthi_settings", {
  targetExam: "JEE",
  dailyGoal: "2 hours"
});

const settingsName = document.getElementById("settingsName");
const settingsEmail = document.getElementById("settingsEmail");
const targetExam = document.getElementById("targetExam");
const dailyGoal = document.getElementById("dailyGoal");
const settingsAlert = document.getElementById("settingsAlert");

if (settingsUser) {
  settingsName.value = settingsUser.fullName;
  settingsEmail.value = settingsUser.email;
}

targetExam.value = savedSettings.targetExam;
dailyGoal.value = savedSettings.dailyGoal;

document.getElementById("settingsForm").addEventListener("submit", function (event) {
  event.preventDefault();

  if (settingsName.value.trim().length < 3) {
    settingsAlert.textContent = "Please enter a valid full name.";
    settingsAlert.className = "alert alert-danger";
    return;
  }

  if (settingsUser) {
    const updatedUser = {
      fullName: settingsName.value.trim(),
      email: settingsUser.email
    };
    setJSON(STORAGE_KEYS.currentUser, updatedUser);
  }

  setJSON("examsarthi_settings", {
    targetExam: targetExam.value,
    dailyGoal: dailyGoal.value
  });

  settingsAlert.textContent = "Settings saved successfully.";
  settingsAlert.className = "alert alert-success";
});
