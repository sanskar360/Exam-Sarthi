const user = getCurrentUser();
if (user) {
  document.getElementById("dashboardName").textContent = user.name;
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

const labels = results.slice(-7).map(result => result.examName);
const scores = results.slice(-7).map(result => Math.max(0, result.score));
const chartLabels = results.slice(-7).map(result => result.examName);

const chartScores = results.slice(-7).map(
    result => result.score
);

new Chart(document.getElementById("weeklyChart"), {
    type: "bar",

    data: {
        labels: chartLabels,

        datasets: [{
            label: "Score %",
            data: chartScores,
            backgroundColor: "#2563EB",
            borderRadius: 8,
            maxBarThickness: 60
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true
            },

            x: {
                display: false
            }
        }
    }
});

// MJS

// Geting user from local host

function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem(
            "loggedInUser"
        )
    );
}

function getResults(){

    return JSON.parse(
        localStorage.getItem(
            "results"
        )
    ) || [];
}