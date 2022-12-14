/*
let scrollPosition = 0;
let ticking = false;

function doSomething(scroll_pos) {//load the next few contacts
  scrollPosition += 10;//the LIMIT I added to SearchContact.php should restrict it from having 18 values, etc.
}

contacts.addEventListener('scroll', (e) => {
  scrollPosition = contacts.scrollY;//get the number of contacts displayed (contact 10, 16, whatever)

  if (scrollPosition >= 8) {//if the contact displayed is greated than 8 increase by 10
    window.requestAnimationFrame(() => {
      doSomething(scrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});
*/

const { firstName, id } = JSON.parse(localStorage.getItem('user'));
if (!localStorage.getItem('contacts')) {
  localStorage.setItem('contacts', JSON.stringify({}));
}
const contacts = JSON.parse(localStorage.getItem('contacts'))
const title = `Welcome ${firstName}!`;
const table = document.getElementById("contacts");
const searchBar = document.querySelector(".searchBar");
const logoutButton = document.querySelector("#logoutButton");
const addContactButton = document.querySelector("#addContactButton");

let currentRequestId = 0;

async function searchContacts(query, userId, page = 0) {
  return await fetch("/api/SearchContacts.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      userId,
      page,
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
    let tab = `<tbody id="tbody"><tr>
	<th>First Name</th>
	<th>Last Name</th>
	<th>Email</th>
	<th>Phone Number</th>
	</tr>`;

    // Loop to access all rows
    for (let contact of data.contacts) {
      const { firstName, lastName, email, phoneNumber, contactId } = contact;
      console.log({ firstName, lastName, email, phoneNumber, contactId });
      tab += `<tr onclick="onTableRowClick({ contactId: ${contactId}, firstName: \`${firstName}\`, lastName: \`${lastName}\`, email: \`${email}\`, phoneNumber: \`${phoneNumber}\`})"> 
	<td>${firstName} </td>
	<td>${lastName}</td>
	<td>${email}</td> 
	<td>${phoneNumber}</td>          
	</tr>`;
    }
    tab += "</tbody>";
    // Setting innerHTML as tab variable
    table.innerHTML = tab;
    console.log(`setting innerHTML for query ${query}`);
  }
}

function onTableRowClick({ contactId, firstName, lastName, phoneNumber, email }) {
  const params = new URLSearchParams({ contactId: contactId.toString(), firstName, lastName, phoneNumber, email });
  window.location.href = `/EditContact.html?${params}`
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

function doLogout() {
  localStorage.clear();
  window.location.href = "index.html";
}

loadTable("", currentRequestId);

document.querySelector('#title').innerHTML = title;

logoutButton.addEventListener('click', doLogout);
addContactButton.addEventListener('click', () => {
  window.location.href = '/AddContact.html';
});

let currentPage = 0;
let isLoading = false;

async function loadMore(query) {
  const tbody = document.querySelector('#tbody');
  const data = await searchContacts(query, id, currentPage);
  console.log(`got data for query ${query}`);
  if (data.contacts.length === 0) {
    // do nothing
  } else {
    let tab = '';

    // Loop to access all rows
    for (let contact of data.contacts) {
      const { firstName, lastName, email, phoneNumber, contactId } = contact;
      console.log({ firstName, lastName, email, phoneNumber, contactId });
      tab += `<tr onclick="onTableRowClick({ contactId: ${contactId}, firstName: \`${firstName}\`, lastName: \`${lastName}\`, email: \`${email}\`, phoneNumber: \`${phoneNumber}\`})"> 
	<td>${firstName} </td>
	<td>${lastName}</td>
	<td>${email}</td> 
	<td>${phoneNumber}</td>          
	</tr>`;
    }
    // Setting innerHTML as tab variable
    tbody.innerHTML += tab;
    console.log(`setting innerHTML for query ${query}`);
  }
}

const container = document.querySelector('#container');
container.addEventListener('scroll', async () => {
  if (Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 1 && !isLoading) {
    currentPage++;
    isLoading = true;
    await loadMore(searchBar.value);
    isLoading = false;
  }
});
