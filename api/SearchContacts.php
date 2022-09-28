<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $requestData, mysqli $db) {
	$stmt = $db->prepare("select * from Contacts where (FirstName like ? OR LastName like ?) AND UserID=? LIMIT 10 OFFSET ?");//added LIMIT 10 to this line
	$contactName = "%" . $requestData["query"] . "%";
	$offset = ($requestData["page"] ?? 0) * 10;
	$stmt->bind_param("ssii", $contactName, $contactName, $requestData["userId"], $offset);
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
