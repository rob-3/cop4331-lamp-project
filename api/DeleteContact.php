<?php
require_once('./Utils.php');
on_json_request_with_db(function(mixed $request_data, mysqli $db) {
	$user_id = $request_data['userId'];
	$contact_id = $request_data['contactId'];

	if (!$user_id) {
		return [
			'result' => false,
			'error' => 'Must provide userId!',
		];
	}

	if (!$contact_id) {
		return [
			'result' => false,
			'error' => 'Must provide contactId!',
		];
	}

	$stmt = $db->prepare('DELETE FROM Contacts WHERE UserID=? AND ContactID=?');
	$stmt->bind_param('ii', $user_id, $contact_id);
	$success = $stmt->execute();
	$stmt->close();

	return [
		'result' => $success
	];
});