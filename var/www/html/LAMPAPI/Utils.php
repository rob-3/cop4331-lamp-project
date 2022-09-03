<?php
set_error_handler(function ($code, $message) {
	error_log("{$code}: {$message}");
});

function on_json_request(callable $handler) {
	header('content-type: application/json');
	$requestData = json_decode(file_get_contents('php://input'), true);
	try {
		$ret = $handler($requestData);
		if ($ret) {
			echo json_encode($ret);
		}
	} catch (Throwable $th) {
		http_response_code(500);
		error_log($th->getMessage());
		echo json_encode([
			'status' => http_response_code(),
			'message' => 'Internal server error'
		]);
	}
}

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
