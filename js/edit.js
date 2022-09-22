
async function editContacts(){
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

    const first = document.getElementById("firstName");
    const last = document.getElementById("lastName");
    const mail = document.getElementById("email");
    const tele = document.getElementById("phoneNumber");
    console.log("before");
    console.log(data);
    
    /*if(first.localeCompare(firstName) != 0 && first.length > 0){
        firstName = first;
    }

    if(last.localeCompare(`${lastName}`) != 0 && last.length > 0){
        lastName = last;
    }

    if(mail.localeCompare(`${email}`) != 0 && mail.length > 0){
        email = mail;
    }

    if(tele.localeCompare(`${phone}`) != 0 && tele.length > 0){
        phoneNumber = tele;
    }*/
    console.log("after");
    console.log(data);
}
