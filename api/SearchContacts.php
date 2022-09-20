<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $requestData, mysqli $db) {
	$stmt = $db->prepare("select * from Contacts where (FirstName like ? OR LastName like ?) AND UserID=?");
	$contactName = "%" . $requestData["query"] . "%";
	$stmt->bind_param("ssi", $contactName, $contactName, $requestData["userId"]);
	$stmt->execute();
	$result = $stmt->get_result();

	$contacts = [];
	while ($row = $result->fetch_assoc()) {
		array_push($contacts, $row);
	}

	$contacts_with_fixed_casing = [];
	foreach ($contacts as $c) {
		array_push($contacts_with_fixed_casing, [
			'contactId' => $c['ContactID'],
			'firstName' => $c['FirstName'],
			'lastName' => $c['LastName'],
			'email' => $c['Email'],
			'phoneNumber' => $c['PhoneNumber'],
		]);
	}

	$stmt->close();

	return [ 'contacts' => $contacts_with_fixed_casing ];
});
