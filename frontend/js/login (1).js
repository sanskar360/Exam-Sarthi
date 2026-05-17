// ── TAB SWITCHING ──────────────────────────────────────────
function switchTab(tab) {
  const loginForm   = document.getElementById('loginForm');
  const signupForm  = document.getElementById('signupForm');
  const loginTab    = document.getElementById('loginTab');
  const signupTab   = document.getElementById('signupTab');
  const indicator   = document.getElementById('tabIndicator');

  if (tab === 'login') {
    loginForm.classList.remove('d-none');
    signupForm.classList.add('d-none');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    indicator.classList.remove('right');
  } else {
    signupForm.classList.remove('d-none');
    loginForm.classList.add('d-none');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    indicator.classList.add('right');
  }
  clearAllErrors();
}

// ── PASSWORD TOGGLE ────────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.innerHTML = isHidden
    ? `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>`
    : `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`;
}

// Validation 

// ── LOGIN ─────────────────────────────────────

document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    if(!email || !password){

        alert("Please fill all fields");

        return;
    }

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

        alert("Login Successful");

        window.location.href =
        "dashboard.html";

    } else {

        alert("Invalid Credentials");
    }
});

// ── SIGNUP ───────────────────────────────────

document.getElementById("signupForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
    document.getElementById("signupName").value;

    let email =
    document.getElementById("signupEmail").value;

    let password =
    document.getElementById("signupPassword").value;

    let confirm =
    document.getElementById("signupConfirm").value;

    if(
        !name ||
        !email ||
        !password ||
        !confirm
    ){

        alert("Please fill all fields");

        return;
    }

    if(password !== confirm){
        alert("Passwords do not match");
        return;
    }

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

    let newUser = {

        id: Date.now(),

        name,

        email,

        password
    };

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Signup Successful");

    switchTab("login");
});