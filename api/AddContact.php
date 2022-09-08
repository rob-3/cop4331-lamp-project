<?php
require_once('./Utils.php');
on_json_request_with_db(function(mixed $request_data, mysqli $db) {
	$user_id = $request_data['userId'];
	$contact = $request_data['contact'];

	$first_name = $contact['firstName'];
	$last_name = $contact['lastName'];
	$email = $contact['email'];
	$phone_number = $contact['phoneNumber'];

	$stmt = $db->prepare('INSERT into Contacts (UserID, FirstName, LastName, Email, PhoneNumber) VALUES(?,?,?,?,?)');
	$stmt->bind_param('issss', $user_id, $first_name, $last_name, $email, $phone_number);
	$success = $stmt->execute();
	$stmt->close();

	return [
		"result" => $success
	];
});
