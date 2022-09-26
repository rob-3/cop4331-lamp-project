const params = new URL(window.location.href).searchParams;
const contactId = Number(params.get("contactId"));
const firstName = Number(params.get("firstName"));
const lastName = Number(params.get("lastName"));
const phoneNumber = Number(params.get("phoneNumber"));
const email = Number(params.get("email"));
const { id: userId } = JSON.parse(localStorage.getItem("user"));
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("contactEmail");
const phoneNumberInput = document.getElementById("phoneNumber");

async function editContact() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const phoneNumber = phoneNumberInput.value;

  await fetch("/api/EditContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contact: {
        contactId,
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    }),
  }).then((b) => b.json());
  window.location.href = "/LandingPage.html"
}

async function deleteContact(){
  await fetch("/api/DeleteContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contactId,
    }),
  }).then((b) => b.json());
  window.location.href = "/LandingPage.html"
}

firstNameInput.value = firstName;
lastNameInput.value = lastName;
phoneNumberInput.value = phoneNumber;
emailInput.value = email;
