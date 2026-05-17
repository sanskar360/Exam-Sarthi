function getResults(){

  return JSON.parse(
    localStorage.getItem(
      "results"
    )
  ) || [];
}

const analyticsResults =
getResults();

const fallbackResults = [
  {
    examName: "Demo Test 1",
    score: 3,
    total: 5,
    percentage: 60
  },
  {
    examName: "Demo Test 2",
    score: 4,
    total: 5,
    percentage: 80
  },
  {
    examName: "Demo Test 3",
    score: 3,
    total: 5,
    percentage: 60
  }
];

const chartResults =
analyticsResults.length
? analyticsResults
: fallbackResults;

const latest =
chartResults[chartResults.length - 1];

document.getElementById(
  "accuracyCard"
).textContent =

`${latest.percentage}%`;

document.getElementById(
  "scoreCard"
).textContent =

`${latest.score}/${latest.total}`;

document.getElementById(
  "rankCard"
).textContent =

latest.percentage >= 80

? "Top 10%"

: latest.percentage >= 60

? "Top 25%"

: "Top 40%";

new Chart(

  document.getElementById(
    "scoreLineChart"
  ),

  {
    type: "line",

    data: {

      labels:

      chartResults.map(
        (_, index) =>

        `Test ${index + 1}`
      ),

      datasets: [{

        label: "Score %",

        data:

        chartResults.map(
          result =>
          result.percentage
        ),

        borderColor: "#2563EB",

        backgroundColor:
        "rgba(37, 99, 235, 0.12)",

        tension: 0.35,

        fill: true
      }]
    },

    options: {

      responsive: true,

      scales: {

        y: {

          beginAtZero: true,

          max: 100
        }
      }
    }
  }
);

new Chart(

  document.getElementById(
    "accuracyPieChart"
  ),

  {
    type: "pie",

    data: {

      labels: [
        "Correct",
        "Incorrect"
      ],

      datasets: [{

        data: [
          latest.score,
          latest.total - latest.score
        ],

        backgroundColor: [
          "#2563EB",
          "#E5E7EB"
        ]
      }]
    },

    options: {

      responsive: true
    }
  }
);

new Chart(

  document.getElementById(
    "trendChart"
  ),

  {
    type: "bar",

    data: {

      labels:

      chartResults.map(
        result =>
        result.examName
      ),

      datasets: [{

        label: "Performance %",

        data:

        chartResults.map(
          result =>
          result.percentage
        ),

        backgroundColor:
        "#2563EB",

        borderRadius: 6
      }]
    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          display: false
        }
      },

      scales: {

        y: {

          beginAtZero: true,

          max: 100
        }
      }
    }
  }
);