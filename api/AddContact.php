<?php
require_once('./Utils.php');
on_json_request_with_db(function(mixed $request_data, mysqli $db) {
	$contact = $request_data['contact'];
	$user_id = $request_data['userId'];

	$stmt = $db->prepare('INSERT into Contacts (UserId,Name) VALUES(?,?)');
	$stmt->bind_param('ss', $user_id, $contact);
	$stmt->execute();
	$stmt->close();

	return [
		'hello' => 'world'
	];
});
