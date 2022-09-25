let userId = 0;
let firstName = "";
let lastName = "";

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
    localStorage.setItem('user', JSON.stringify(data.user));
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
