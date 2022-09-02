<?php
function create_db(): ?\mysqli {
	// FIXME we need the real credentials, and probably should store them
	// outside the code
	$db = new mysqli('localhost', 'TheBeast', 'WeLoveCOP4331', 'COP4331');
	if ($db->connect_error) {
		error_log($db->connect_error);
		return null;
	}
	return $db;
}

function log_and_die(string $s): void {
	http_response_code(500);
	error_log($s);
	echo json_encode([
		'status' => http_response_code(),
		'message' => 'Internal server error'
	]);
	exit;
}
