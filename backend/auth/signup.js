function signup(name, email, password){

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    let existingUser =
    users.find(
        user => user.email === email
    );

    if(existingUser){

        alert("User already exists");

        return;
    }

    users.push({

        id: Date.now(),

        name,

        email,

        password
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Signup Successful");

    window.location.href =
    "login.html";
}


document.getElementById(
    "signupForm"
)

.addEventListener(
    "submit",

    function(e){

        e.preventDefault();

        let name =
        document.getElementById(
            "signupName"
        ).value;

        let email =
        document.getElementById(
            "signupEmail"
        ).value;

        let password =
        document.getElementById(
            "signupPassword"
        ).value;

        signup(name, email, password);
    }
);