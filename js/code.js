let userId = 0;
let firstName = "";
let lastName = "";

async function doRegister()
{
  userId = 0;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
	let login = document.getElementById("registerName").value;
	let password = document.getElementById("registerPassword").value;

     const data = await fetch("/api/Register.php", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username: login,
            password: password,
            first_name: firstName,
            last_name: lastName,
        })
    }).then(b => b.json());
  if(!data.result)
    console.log("Username is taken bruh");
  else
    console.log("I think it registered");


}

async function doLogin()
{
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
            password: password,
        })
    }).then(b => b.json());
    if(data.result)
    {
      console.log("Your name is " + data.user.firstName + " " + data.user.lastName + " and I think we logged in");
      window.location.href = "color.html";
    }
    else
      console.log(data.error);
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

/*
 * API mocks by Rob
 *
 * Call these functions with dummy data for now, and it will be easy to write
 * the real implementation once the backend is done.
 *
 * You can test network and server errors
 */

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
		return Promise.reject(new TypeError("NetworkError when attempting to fetch resource."))
	}
	if (serverErrors) {
		return Promise.resolve(new Response(null, { status: 500, statusText: "Internal server error" }));
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
		return Promise.reject(new TypeError("NetworkError when attempting to fetch resource."))
	}
	if (serverErrors) {
		return Math.random() > 0.5
			? Promise.resolve(new Response(JSON.stringify()))
			: Promise.resolve(new Response(null, { status: 500, statusText: "Internal server error" }));
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
		return Promise.reject(new TypeError("NetworkError when attempting to fetch resource."))
	}
	if (serverErrors) {
		return Promise.resolve(new Response(null, { status: 500, statusText: "Internal server error" }));
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
		return Promise.reject(new TypeError("NetworkError when attempting to fetch resource."))
	}
	if (serverErrors) {
		return Promise.resolve(new Response(null, { status: 500, statusText: "Internal server error" }));
	}
	return Promise.resolve(new Response(
		JSON.stringify({
			contacts: _getRandomContacts().slice(0, n)
		}),
		{ status: 200, statusText: "OK" }
	));
}

function _getRandomContacts() {
	return Math.random() > 0.3 ? [
		{
			"id": "6313d5b544a58c5568a7df79",
			"firstName": "Kathryn",
			"lastName": "Haley",
			"email": "kathrynhaley@gushkool.com",
			"phone": "+1 (938) 430-3562"
		},
		{
			"id": "6313d5b54faad6e8a79cf4c4",
			"firstName": "Vang",
			"lastName": "Clark",
			"email": "vangclark@gushkool.com",
			"phone": "+1 (807) 555-2359"
		},
		{
			"id": "6313d5b53d18f229a2e159c4",
			"firstName": "Maryanne",
			"lastName": "Marshall",
			"email": "maryannemarshall@gushkool.com",
			"phone": "+1 (873) 560-2796"
		},
		{
			"id": "6313d5b53eb0811425be14ac",
			"firstName": "Britt",
			"lastName": "Rice",
			"email": "brittrice@gushkool.com",
			"phone": "+1 (949) 512-3579"
		},
		{
			"id": "6313d5b51619f811e6ce3c4a",
			"firstName": "Mary",
			"lastName": "Kramer",
			"email": "marykramer@gushkool.com",
			"phone": "+1 (963) 497-3284"
		},
		{
			"id": "6313d5b557232d3b1b0048f0",
			"firstName": "Cardenas",
			"lastName": "Grant",
			"email": "cardenasgrant@gushkool.com",
			"phone": "+1 (913) 508-2047"
		},
		{
			"id": "6313d5b555eda2d20406f7ec",
			"firstName": "James",
			"lastName": "Lyons",
			"email": "jameslyons@gushkool.com",
			"phone": "+1 (893) 463-3325"
		},
		{
			"id": "6313d5b5f9821f9f8a27179c",
			"firstName": "Smith",
			"lastName": "Herman",
			"email": "smithherman@gushkool.com",
			"phone": "+1 (827) 431-3829"
		},
		{
			"id": "6313d5b5ad3ba0d7da46d734",
			"firstName": "Haynes",
			"lastName": "Bright",
			"email": "haynesbright@gushkool.com",
			"phone": "+1 (965) 429-2737"
		},
		{
			"id": "6313d5b590e3c08e4c2b9bd6",
			"firstName": "Trudy",
			"lastName": "Fitzgerald",
			"email": "trudyfitzgerald@gushkool.com",
			"phone": "+1 (918) 402-3867"
		}
		] : Math.random() > 0.5 ? [
			{
				"id": "6313d5decc097b5a605d0689",
				"firstName": "Sheila",
				"lastName": "Burt",
				"email": "sheilaburt@gushkool.com",
				"phone": "+1 (921) 445-3353"
			},
			{
				"id": "6313d5de1eba4fd8a3c57a98",
				"firstName": "Webb",
				"lastName": "Cameron",
				"email": "webbcameron@gushkool.com",
				"phone": "+1 (941) 599-2028"
			},
			{
				"id": "6313d5de3af9937b8b3db58c",
				"firstName": "Hall",
				"lastName": "Maldonado",
				"email": "hallmaldonado@gushkool.com",
				"phone": "+1 (856) 414-2336"
			},
			{
				"id": "6313d5de7f79abe1a7dc5cdd",
				"firstName": "Cherry",
				"lastName": "Gutierrez",
				"email": "cherrygutierrez@gushkool.com",
				"phone": "+1 (865) 505-2912"
			},
			{
				"id": "6313d5de580bb8f4bbd2b6c9",
				"firstName": "Harrell",
				"lastName": "Downs",
				"email": "harrelldowns@gushkool.com",
				"phone": "+1 (800) 544-3898"
			},
			{
				"id": "6313d5de98112547c93a0b69",
				"firstName": "Mia",
				"lastName": "Moore",
				"email": "miamoore@gushkool.com",
				"phone": "+1 (983) 549-3769"
			},
			{
				"id": "6313d5de74497ab738897bea",
				"firstName": "Jeanine",
				"lastName": "Pacheco",
				"email": "jeaninepacheco@gushkool.com",
				"phone": "+1 (951) 416-3355"
			},
			] : []
}
