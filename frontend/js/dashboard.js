const user = getCurrentUser();
if (user) {
  document.getElementById("dashboardName").textContent = user.fullName;
}

const results = getResults();
const totalScore = results.reduce((sum, result) => sum + result.percentage, 0);
const averageScore = results.length ? Math.round(totalScore / results.length) : 0;

document.getElementById("avgScore").textContent = `${averageScore}%`;
document.getElementById("examsTaken").textContent = results.length;

const recentBody = document.getElementById("recentTestsBody");
const recentResults = results.slice(-5).reverse();
recentBody.innerHTML = recentResults.length
  ? recentResults.map(result => `
      <tr>
        <td>${result.examName}</td>
        <td>${result.score}/${result.total}</td>
        <td>${result.date}</td>
      </tr>
    `).join("")
  : `<tr><td colspan="3" class="text-secondary">No tests attempted yet.</td></tr>`;

new Chart(document.getElementById("weeklyChart"), {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Questions Practiced",
      data: [22, 35, 28, 42, 31, 48, Math.max(12, results.length * 10)],
      backgroundColor: "#2563EB",
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});
