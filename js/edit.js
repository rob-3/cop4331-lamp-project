let currentRequestId = 0;

async function getContacts(query, userId){
    return {
        userId: 1,
        contacts: [
            {
                contactId: 1,
                firstName: "Chad",
                lastName: "Chaddington",
                email: "chopping@jacks.com",
                phone: "3216650987"
            },
        ]
    };
}

async function editContacts(){
    const data = await getContacts(query, 1)
    const { firstName, lastName, email, phoneNumber } = contact;
    const first = document.getElementById(firstName);
    const last = document.getElementById(lastName);
    const mail = document.getElementById(email);
    const tele = document.getElementById(phoneNumber);
    console.log("before");
    console.log(data);
    if(localeCompare(first, `${firstName}`) != 0 && first.length > 0){
        `${firstName}` = first;
    }

    if(localeCompare(last, `${lastName}`) != 0 && last.length > 0){
        `${firstName}` = first;
    }

    if(localeCompare(mail, `${email}`) != 0 && mail.length > 0){
        `${email}` = mail;
    }

    if(localeCompare(tele, `${phone}`) != 0 && tele.length > 0){
        `${phoneNumber}` = tele;
    }
    console.log("after");
    console.log(data);
}