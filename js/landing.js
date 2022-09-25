const { firstName, id } = JSON.parse(localStorage.getItem('user'));
const title = `Welcome ${firstName}!`;
const table = document.getElementById("contacts");
const searchBar = document.querySelector(".searchBar");

let currentRequestId = 0;

async function searchContacts(query, userId) {
  return await fetch("/api/SearchContacts.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      userId,
    }),
  }).then((b) => b.json());
}

async function loadTable(query, requestId) {
  if (requestId !== currentRequestId) {
    console.log("our request was too old and got cancelled!");
    return;
  }
  console.log(`started loading for query ${query}`);
  table.innerHTML = "Loading...";
  const data = await searchContacts(query, id);
  console.log(`got data for query ${query}`);
  if (data.contacts.length === 0) {
    table.innerHTML = "There is nothing!";
  } else {
    let tab = `<tr>
	<th>First Name</th>
	<th>Last Name</th>
	<th>Email</th>
	<th>Phone Number</th>
	</tr>`;

    // Loop to access all rows
    for (let contact of data.contacts.slice(0, 10)) {
      const { firstName, lastName, email, phoneNumber } = contact;
      tab += `<tr> 
	<td>${firstName} </td>
	<td>${lastName}</td>
	<td>${email}</td> 
	<td>${phoneNumber}</td>          
	</tr>`;
    }
    // Setting innerHTML as tab variable
    table.innerHTML = tab;
    console.log(`setting innerHTML for query ${query}`);
  }
}

searchBar.addEventListener("keydown", () => {
  currentRequestId++;
  const id = currentRequestId;
  setTimeout(() => {
    if (currentRequestId === id) {
      loadTable(searchBar.value, id);
    }
  }, 200);
});

loadTable("");

document.querySelector('#title').innerHTML = title;
