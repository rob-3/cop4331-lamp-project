<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $request_data, mysqli $db) {
	$user_id = $request_data['userId'];
	if (!$user_id) {
		return [
			'result' => false,
			'error' => 'userId is a required property!'
		];
	}

	$contact = $request_data['contact'];
	if (!$contact) {
		return [
			'result' => false,
			'error' => 'contact is a required property and must contain contactId and at least one modification!'
		];
	}

	$contact_id = $contact['contactId'];
	if (!$contact_id) {
		return [
			'result' => false,
			'error' => 'contact.contactId is a required property!'
		];
	}

	$first_name = $contact['firstName'];
	$last_name = $contact['lastName'];
	$email = $contact['email'];
	$phone_number = $contact['phoneNumber'];

	$set_string = '';
	if ($first_name) {
		$set_string .= "FirstName = '{$first_name}',";
	}
	if ($last_name) {
		$set_string .= "LastName = '{$last_name}',";
	}
	if ($email) {
		$set_string .= "Email = '{$email}',";
	}
	if ($phone_number) {
		$set_string .= "PhoneNumber = '{$phone_number}',";
	}
	$set_string = rtrim($set_string, ',');

	$stmt = $db->prepare("UPDATE Contacts SET {$set_string} WHERE UserID=? AND ContactID=?");
	$stmt->bind_param('ii', $user_id, $contact_id);
	$success = $stmt->execute();
	$stmt->close();

	return [
		"result" => $success
	];
});
