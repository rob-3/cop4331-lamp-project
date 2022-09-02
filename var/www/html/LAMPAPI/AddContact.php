<?php
require_once('./Utils.php');
try {
	header('content-type: application/json');

	$requestData = json_decode(file_get_contents('php://input'), true);
	
	$contact = $requestData['contact'];
	$userId = $requestData['userId'];

	$db = create_db();
	if (!$db) {
		throw new Exception('Database connection failed!');
	}

	$stmt = $db->prepare('INSERT into Contacts (UserId,Name) VALUES(?,?)');
	$stmt->bind_param('ss', $userId, $contact);
	$stmt->execute();
	$stmt->close();
	$db->close();
} catch (\Throwable $th) {
	log_and_die($th->getMessage());
}
