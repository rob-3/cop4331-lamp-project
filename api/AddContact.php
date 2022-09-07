<?php
require_once('./Utils.php');
on_json_request_with_db(function(mixed $requestData, mysqli $db) {
	$contact = $requestData['contact'];
	$userId = $requestData['userId'];

	$stmt = $db->prepare('INSERT into Contacts (UserId,Name) VALUES(?,?)');
	$stmt->bind_param('ss', $userId, $contact);
	$stmt->execute();
	$stmt->close();

	return [
		'hello' => 'world'
	];
});
