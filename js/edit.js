async function editContact() {
  const data = await fetch("/api/SearchContacts.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: "rob",
      userId: 1,
    }),
  }).then((b) => b.json());

  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;
  const mail = document.getElementById("contactEmail").value;
  const tele = document.getElementById("phoneNumber").value;

  if (first != data.contacts[0].firstName && first.length > 0) {
    console.log("they are different!");
  } else first = data.contacts[0].firstName;

  if (last != data.contacts[0].lastName && last.length > 0)
    console.log("they are different!");
  else last = data.contacts[0].lastName;

  if (mail != data.contacts[0].email && mail.length > 0) {
    console.log("they are different!");
  } else {
    mail = data.contacts[0].mail;
  }

  if (tele != data.contacts[0].phoneNumber && tele.length > 0) {
    console.log("they are different!");
  } else {
    tele = data.contacts[0].phoneNumber;
  }
  fetch("/api/EditContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      contact: {
        contactId: 567570,
        firstName: first,
        lastName: last,
        email: mail,
        phoneNumber: tele,
      },
    }),
  }).then((b) => b.json());
}
async function deleteContact(){
  const data = await fetch("/api/DeleteContact.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: "rob",
      userId: 1,
      contact: {
        contactId: 567570,
      },
    }),
  }).then((b) => b.json());

console.log(data);
}
