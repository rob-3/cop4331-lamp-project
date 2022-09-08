<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $request_data, mysqli $db) {
	$username = $request_data["username"];

	$stmt = $db->prepare('SELECT FirstName, LastName, UserID, Password FROM Users where Login=?');
	$stmt->bind_param("s", $username);
	$stmt->execute();
	$data = $stmt->get_result()->fetch_assoc();
	if ($data && password_verify($request_data["password"], $data["Password"])) {
		return [
			'result' => true,
			'user' => [
				'firstName' => $data['FirstName'],
				'lastName' => $data['FirstName'],
				'id' => $data['UserID'],
			]
		];
	}
	return [
		'result' => false,
		'error' => 'Incorrect credentials.'
	];
});
