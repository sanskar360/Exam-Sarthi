function login(email, password){

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    let user =
    users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if(user){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        window.location.href =
        "dashboard.html";

    } else {

        alert("Invalid Credentials");
    }
}