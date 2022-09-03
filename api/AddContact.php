<?php
require_once('./Utils.php');
on_json_request(function(mixed $requestData) {
	$contact = $requestData['contact'];
	$userId = $requestData['userId'];

	$db = open_db();
	if (!$db) {
		throw new Exception('Database connection failed!');
	}

	$stmt = $db->prepare('INSERT into Contacts (UserId,Name) VALUES(?,?)');
	$stmt->bind_param('ss', $userId, $contact);
	$stmt->execute();
	$stmt->close();
	$db->close();

	return [
		'hello' => 'world'
	];
});
