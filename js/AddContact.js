const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const phoneNumberInput = document.querySelector('#phoneNumber');
const emailInput = document.querySelector('#contactEmail');
const addContactButton = document.querySelector('#addContactButton');
const { id: userId } = JSON.parse(localStorage.getItem('user'));

addContactButton.addEventListener('click', async () => {
	addContactButton.disabled = true;
	const success = await addContact({
		userId,
		contact: {
			firstName: firstNameInput.value,
			lastName: lastNameInput.value,
			phoneNumber: phoneNumberInput.value,
			email: emailInput.value,
		}
	});
	if (success) {
		window.href = '/LandingPage.html';
	} else {
		console.log('adding contact failed!');
	}
	addContactButton.disabled = false;
});

const addContact = async ({ userId, contact: { firstName, lastName, email, phoneNumber } }) => {
	const response = await fetch('/api/AddContact.php', {
		method: 'POST',
		headers: 'application/json',
		body: JSON.stringify({
			userId,
			contact: {
				firstName,
				lastName,
				email,
				phoneNumber,
			}
		})
	}).then(b => b.json());
	return response.result;
}
