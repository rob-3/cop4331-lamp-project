let userId = 0;
let firstName = "";
let lastName = "";

function passwordRequirements(password) {
  let upperCase = false;
  let lowerCase = false;
  let passwordNumber = false;
  let passwordLength = false;
  let tempDigit;
  let tempUpper;
  let tempLower

  if (password.length >= 8) {
    passwordLength = true;
  }

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= '0' && password[i] <= '9') {
      passwordNumber = true;
    }
    else if (password[i].toUpperCase() === password[i]) {
      upperCase = true;
    }
    else if (password[i].toUpperCase() !== password[i]) {
      lowerCase = true;
    }
  }

  if (passwordLength && passwordNumber && upperCase && lowerCase) {
    return true;
  }
  else {
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
  }
  if (data.result) {
    console.log("Account created successfully!");
    window.location.href = "index.html";
  }
  else {
    console.log("Password must meet all requirements!");
    window.location.href = "Registration.html";
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

// set to true to cause network errors for testing
const networkErrors = false;

// set to true to cause server errors for testing
const serverErrors = false;

/**
 * Create a contact.
 * @param {number} userId The user's ID
 * @param {Contact} contact
 */
function addContact(userId, contact) {
  if (networkErrors) {
    return Promise.reject(
      new TypeError("NetworkError when attempting to fetch resource.")
    );
  }
  if (serverErrors) {
    return Promise.resolve(
      new Response(null, { status: 500, statusText: "Internal server error" })
    );
  }
  return Promise.resolve(new Response(null, { status: 200, statusText: "OK" }));
}

/**
 * Delete a contact.
 * @param {number} userId The user's ID
 * @param {number} contactId
 */
function deleteContact(userId, contactId) {
  if (networkErrors) {
    return Promise.reject(
      new TypeError("NetworkError when attempting to fetch resource.")
    );
  }
  if (serverErrors) {
    return Math.random() > 0.5
      ? Promise.resolve(new Response(JSON.stringify()))
      : Promise.resolve(
        new Response(null, {
          status: 500,
          statusText: "Internal server error",
        })
      );
  }
  return Promise.resolve(new Response(null, { status: 200, statusText: "OK" }));
}

/**
 * Update a contact.
 * @param {number} userId The user's ID
 * @param {Contact} newContact a _complete_ Contact object, including id and any updated values
 */
function editContact(userId, newContact) {
  if (networkErrors) {
    return Promise.reject(
      new TypeError("NetworkError when attempting to fetch resource.")
    );
  }
  if (serverErrors) {
    return Promise.resolve(
      new Response(null, { status: 500, statusText: "Internal server error" })
    );
  }
  return Promise.resolve(new Response(null, { status: 200, statusText: "OK" }));
}

/**
 * Returns randomly some contacts, for now.
 * @param {number} userId The user's ID
 * @param {number} n How many contacts to fetch at most
 */
function getContacts(userId, n) {
  return searchContacts(userId, "", n);
}

/**
 * Returns randomly some contacts, for now.
 * @param {number} userId The user's ID
 * @param {string} query Can be empty to just get in order.
 * @param {number} n How many contacts to fetch at most
 */
function searchContacts(userId, query, n) {
  if (networkErrors) {
    return Promise.reject(
      new TypeError("NetworkError when attempting to fetch resource.")
    );
  }
  if (serverErrors) {
    return Promise.resolve(
      new Response(null, { status: 500, statusText: "Internal server error" })
    );
  }
  return Promise.resolve(
    new Response(
      JSON.stringify({
        contacts: _getRandomContacts().slice(0, n),
      }),
      { status: 200, statusText: "OK" }
    )
  );
}