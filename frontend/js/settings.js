function getCurrentUser(){

  return JSON.parse(
    localStorage.getItem(
      "loggedInUser"
    )
  );
}

function getSettings(){

  return JSON.parse(
    localStorage.getItem(
      "examsarthi_settings"
    )
  ) || {

    targetExam: "JEE",

    dailyGoal: "2 hours"
  };
}

const settingsUser =
getCurrentUser();

const savedSettings =
getSettings();

const settingsName =
document.getElementById(
  "settingsName"
);

const settingsEmail =
document.getElementById(
  "settingsEmail"
);

const targetExam =
document.getElementById(
  "targetExam"
);

const dailyGoal =
document.getElementById(
  "dailyGoal"
);

const settingsAlert =
document.getElementById(
  "settingsAlert"
);

if(settingsUser){

  settingsName.value =
  settingsUser.name;

  settingsEmail.value =
  settingsUser.email;
}

targetExam.value =
savedSettings.targetExam;

dailyGoal.value =
savedSettings.dailyGoal;

document
.getElementById(
  "settingsForm"
)

.addEventListener(
  "submit",

  function(event){

    event.preventDefault();

    if(
      settingsName.value
      .trim()
      .length < 3
    ){

      settingsAlert.textContent =
      "Please enter valid name.";

      settingsAlert.className =
      "alert alert-danger";

      settingsAlert.classList.remove(
        "d-none"
      );

      return;
    }

    let users =
    JSON.parse(
      localStorage.getItem(
        "users"
      )
    ) || [];

    let updatedUser = {

      ...settingsUser,

      name:
      settingsName.value.trim()
    };

    let updatedUsers =
    users.map(user =>

      user.id === settingsUser.id

      ? updatedUser

      : user
    );

    localStorage.setItem(

      "users",

      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(

      "loggedInUser",

      JSON.stringify(updatedUser)
    );

    localStorage.setItem(

      "examsarthi_settings",

      JSON.stringify({

        targetExam:
        targetExam.value,

        dailyGoal:
        dailyGoal.value
      })
    );

    settingsAlert.textContent =
    "Settings saved successfully.";

    settingsAlert.className =
    "alert alert-success";

    settingsAlert.classList.remove(
      "d-none"
    );
  }
);