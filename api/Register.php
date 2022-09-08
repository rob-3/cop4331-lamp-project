<?php
require_once('./Utils.php');
on_json_request_with_db(function (mixed $request_data, mysqli $db) {
  $login = $request_data['login'];
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

  $hashed_password = password_hash($request_data["password"], PASSWORD_DEFAULT);
  $first_name = $request_data['first_name'];
  $last_name = $request_data['last_name'];


  $stmt = $db->prepare('INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)');
  $stmt->bind_param('ssss', $first_name, $last_name, $login, $hashed_password);
  $success = $stmt->execute();

  return [
    "result" => $success
  ];

});
