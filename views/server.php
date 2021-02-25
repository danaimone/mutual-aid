<?php
session_start();
//initialize variables
$userHint = "";
$textcolor = "#FFFFFF";
$username = "";
$errors = array();
if($userHint == null) {
  $userHint = 'Enter Username';
}
// connect to the database
$db = mysqli_connect('localhost', 'root', 'Winnie101699!!', 'registration');

// If user needs to be registered
if (isset($_POST['reg_user'])) {
  $username = $db -> real_escape_string($_POST['username']);
  $password_1 = $db -> real_escape_string($_POST['password']);
  //check if user did not enter a username or password
  if ($username == null) {
  	$errors[] = "Username is required";
  }
  if ($password_1 == null) {
  	$errors[] = "Password is required";
  }
  //check if user already exists - cannot have two entries with the same username
  $user_check_query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  // if a user already exists with that username
  if ($user) {
      $errors[] = "Username already exists";
  }

  // register user if there are no errors
  if (sizeof($errors) == 0) {
    $textcolor = "#FFFFFF";
  	$password = md5($password_1); //encrypt the password
  	$query = "INSERT INTO users (username, password) VALUES('$username',  '$password')";
  	mysqli_query($db, $query);
  	header('location: index.php'); //login user and go to homepage
  } else {
      $textcolor = "#FF0000"; //set text color to error (red)
  }
}
// if user needs to be logged in (already have an account)
else if (isset($_POST['log_user'])) {
  $username = $db -> real_escape_string($_POST['username']);
  $password = $db -> real_escape_string($_POST['password']);
  //check to ensure user didn't leave a field blank
  if ($username == null) {
  	$errors[] = "Username is required";
  }
  if ($password == null) {
  	$errors[] = "Password is required";
  }
  //if no errors then log the user in
  if (sizeof($errors) == 0) {
  	$password = md5($password); //encrypt password
  	$query = "SELECT * FROM users WHERE username='$username' AND password='$password' LIMIT 1";
  	$results = mysqli_query($db, $query);
  	if ($results -> num_rows != 0) { //if username and password are correct & found in database
      $textcolor = "#FFFFFF";
  	  header('location: index.php');
  	}else {
      $textcolor = "#FF0000"; //change text color to error (red)
  		$errors[] = "Wrong username/password combination";
      }
  	}
  }
?>
