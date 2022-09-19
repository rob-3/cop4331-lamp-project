<?php
set_error_handler(function ($code, $message) {
	error_log("{$code}: {$message}");
});

function on_json_request(callable $handler) {
	header('content-type: application/json');
	$request_data = json_decode(file_get_contents('php://input'), true);
	try {
		$ret = $handler($request_data);
		if ($ret) {
			echo json_encode($ret);
		}
	} catch (Throwable $th) {
		http_response_code(500);
		error_log($th->getMessage());
	}
}

function on_json_request_with_db(callable $handler) {
	header('content-type: application/json');
	$request_data = json_decode(file_get_contents('php://input'), true);
	try {
		$db = open_db();
		if (!$db) {
			throw new Exception('Database could not be opened.');
		}
		$ret = $handler($request_data, $db);
		if ($ret) {
			echo json_encode($ret);
		}
	} catch (Throwable $th) {
		http_response_code(500);
		error_log($th->getMessage());
	} finally {
		$db->close();
	}
}

function open_db(): ?\mysqli {
	// FIXME we should store the credentials outside the code
	$db = new mysqli('localhost', 'root', 'password', 'contacts');
	if ($db->connect_error) {
		error_log($db->connect_error);
		return null;
	}
	return $db;
}