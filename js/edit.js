
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
}).then(b => b.json());
    /*console.log(data.contacts[0].lastName);
    console.log(data.contacts[0].email);
    console.log(data.contacts[0].phoneNumber);
    console.log(data.contacts[0].contactId);*/
    
    const first = document.getElementById("firstName").value;
    const last = document.getElementById("lastName");
    const mail = document.getElementById("email");
    const tele = document.getElementById("phoneNumber");
    
    if(first != data.contacts[0].firstName && first.length > 0){
    	console.log("they are different!");
        fetch("/api/SearchContacts.php", {
    		method: "PATCH",
    		headers: {
        		"content-type": "application/json",
    		},
    		body: JSON.stringify({
       	 		"firstName": first
    		})
	}).then(b => b.json())
    }
        
  else{
    console.log("same");
    }
        

}
