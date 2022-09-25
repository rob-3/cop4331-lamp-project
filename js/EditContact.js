const contactId = Number(new URL(window.location.href).searchParams.get("contactId"));
const { id: userId } = JSON.parse(localStorage.getItem("user"));

async function editContact() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("contactEmail").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  const response = await fetch("/api/EditContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      contact: {
        contactId,
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    }),
  }).then((b) => b.json());
  return response.result;
}

async function deleteContact(){
  const data = await fetch("/api/DeleteContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contactId,
    }),
  }).then((b) => b.json());
  return data.result;
}
