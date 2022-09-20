async function searchContacts(query, userId) {
	return await fetch("/api/SearchContacts.php", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query,
			userId,
		})
	}).then(b => b.json());
}

(async () => {
	const data = await searchContacts("", 1);
	console.log(data);

	let tab = 
		`<tr>
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
	document.getElementById("contacts").innerHTML = tab;    
})();
