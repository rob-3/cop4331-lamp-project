<?php
require_once('./Utils.php');
on_json_request(function (mixed $requestData) {
	$db = open_db();
	if (!$db) {
		throw new Error("Failed to open database!");
	}

	$stmt = $db->prepare("select * from Contacts where FirstName like ? and UserID=?");
	$contactName = "%" . $requestData["query"] . "%";
	$stmt->bind_param("ss", $contactName, $requestData["userId"]);
	$stmt->execute();
	$result = $stmt->get_result();

	$contacts = [];
	while ($row = $result->fetch_assoc()) {
		array_push($contacts, $row);
	}

	$stmt->close();
	$db->close();

	return [ 'contacts' => $contacts ];
});
