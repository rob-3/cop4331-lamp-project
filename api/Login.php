<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $request_data, mysqli $db) {
	$username = $request_data["username"];
	$hashed_password = password_hash($request_data["password"], PASSWORD_DEFAULT);

	$stmt = $db->prepare('SELECT FirstName, LastName, UserID FROM Users where Login=? and Password=?');
	$stmt->bind_param("ss", $username, $hashed_password);
	if($stmt->execute()) {
		$data = $stmt->get_result()->fetch_assoc();
		return [
			'result' => true,
			'user' => [
				'firstName' => $data['FirstName'],
				'lastName' => $data['FirstName'],
				'id' => $data['UserID'],
			]
		];
	} else {
		return [
			'result' => false,
			'error' => 'Incorrect credentials.'
		];
	}
});
