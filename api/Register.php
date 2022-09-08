<?php
$username = $request_data['username'];
$stmt = $db->prepare("select * from Users where Login = ?");
$stmt->bind_param("s", $username);
if ($stmt->execute())
{
  return [
    'result' => false,
    'error' => 'Username already taken.'
  ];
}

$hashed_password = password_hash($request_data["password"], PASSWORD_DEFAULT);
$user_id = $request_data['user_id'];
$first_name = $request_data['first_name'];
$last_name = $request_data['last_name'];
$login = $request_data['login'];


$stmt = $db->prepare('INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?,?)');
$stmt->bind_param('ssss', $first_name, $last_name, $login, $hashed_password);
$success = $stmt->execute();
$stmt->close();

return [
  "result" => $success
];
