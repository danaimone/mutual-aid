<?php include('server.php') ?>
<? $userHint = "Enter Username" ?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="log.css">
<title>Login Page</title>
</head>
<body>
 <form method="post" action="register.php">
 <?php include('errors.php'); ?>
  <div class = "loginbox">
  <img src = "https://img.favpng.com/12/20/1/computer-icons-user-profile-login-avatar-png-favpng-EphX5rTBCrk1QLtEWPmS9h1M9.jpg" class = "avatar">
    <CENTER>
    <h1>Register</h1>
    </CENTER>
      <p>Username</p>
      <input type="text" name = "username" placeholder="Enter Username"  >
      <p>Password</p>
      <input type="password" name = "password" placeholder="Enter Password">
      <input type="submit" name = "reg_user" value="Submit">
      <p>
  		Already a member? <a href="login.php">Sign in</a>
  	</p>
  </div>
  </form>
</body>
</html>
