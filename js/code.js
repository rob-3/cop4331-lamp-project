const urlBase = 'http://159.89.91.64/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{

	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	      alert("slay");
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
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
