let userId = 0;
let firstName = "";
let lastName = "";

function passwordRequirements(password) {
  let upperCase = false;
  let lowerCase = false;
  let passwordNumber = false;
  let passwordLength = false;

  if (password.length >= 8) {
    passwordLength = true;
  }

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= "0" && password[i] <= "9") {
      passwordNumber = true;
    } else if (password[i].toUpperCase() === password[i]) {
      upperCase = true;
    } else if (password[i].toUpperCase() !== password[i]) {
      lowerCase = true;
    }
  }

  if (passwordLength && passwordNumber && upperCase && lowerCase) {
    return true;
  } else {
    return false;
  }
}

async function doRegister() {
  userId = 0;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let login = document.getElementById("registerName").value;
  let password = document.getElementById("registerPassword").value;

  if (passwordRequirements(password)) {
    const data = await fetch("/api/Register.php", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        password,
        firstName,
        lastName,
      }),
    }).then((b) => b.json());
  } else {
    console.log("Password must meet all requirements!");
    window.location.href = "Registration.html";
  }

  if (data.result) {
    console.log("Account created successfully!");
    window.location.href = "index.html";
  } else {
    console.log(data.error);
  }
}

async function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";
  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;

  const data = await fetch("/api/Login.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: login,
      password,
      firstName,
      lastName,
    }),
  }).then((b) => b.json());
  if (data.result) {
    console.log(
      "Your name is " +
        data.user.firstName +
        " " +
        data.user.lastName +
        " and you have logged in."
    );
    localStorage.setItem('user', data.user);
    window.location.href = "LandingPage.html";
  } else console.log(data.error);
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

async function addContact(userId, contact) {
  userId = 0;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let contactEmail = document.getElementById("contactEmail").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  const data = await fetch("/api/AddContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userID: 1,
      contact: {
        firstName,
        lastName,
        contactEmail,
        phoneNumber,
      },
    }),
  }).then((b) => b.json());

  if (data.result) {
    console.log("Contact Added Successfully!");
    window.location.href = "AddContact.html";
  } else console.log(data.error);
}
