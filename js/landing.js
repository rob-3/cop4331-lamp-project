async function loadIntoTable() {
	const data = await fetch("/api/SearchContacts.php", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: "rob",
			userId: 1,
		})
	}).then(b => b.text());
	console.log(data);
}
loadIntoTable();
const data = {
	contacts: [
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
		{
			firstName: "Rob",
			lastName: "Boyd",
			email: "abc123@robertboyd.dev",
			phone: "123456789"
		},
	]
};

let tab = 
        `<tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.contacts.slice(0, 10)) {
        tab += `<tr> 
    <td>${r.firstName} </td>
    <td>${r.lastName}</td>
    <td>${r.email}</td> 
    <td>${r.phone}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("contacts").innerHTML = tab;    
    
//}
