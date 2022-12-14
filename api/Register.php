<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $request_data, mysqli $db) {
  $login = $request_data['username'];
  $stmt = $db->prepare("select * from Users where Login=?");
  $stmt->bind_param("s", $login);
  $stmt->execute();
  $data = $stmt->get_result()->fetch_assoc();
  if ($data)
  {
    $stmt->close();
    return [
      'result' => false,
      'error' => 'Username is already taken!'
    ];
  }

  $password = $request_data["password"];
  if ($login === "" || $password === "")
  {
    $stmt->close();
    return [
      'result' => false,
      'error' => 'Username or password must not be the empty string!'
    ];
  }

  $hashed_password = password_hash($password, PASSWORD_DEFAULT);
  $first_name = $request_data['firstName'];
  $last_name = $request_data['lastName'];

  $stmt = $db->prepare('INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)');
  $stmt->bind_param('ssss', $first_name, $last_name, $login, $hashed_password);
  $success = $stmt->execute();

  return [
    "result" => $success
  ];

});
