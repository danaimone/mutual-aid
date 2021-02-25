<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="log.css">
<title>Login Page</title>
</head>
<body>
 <form method="post" action="login.php">
 <?php include('errors.php'); ?>
  <div class = "loginbox">
  <img src = "https://img.favpng.com/12/20/1/computer-icons-user-profile-login-avatar-png-favpng-EphX5rTBCrk1QLtEWPmS9h1M9.jpg" class = "avatar">
    <CENTER>
    <h1>Login </h1>
    </CENTER>
      <p style=' color: <?php echo $textcolor ?>; font-weight: bold; margin: 0; padding: 0;'>Username</p>
      <input type="text" name = "username" placeholder="<?php echo $userHint; ?>" />
      <p style=' color: <?php echo $textcolor ?>; font-weight: bold; margin: 0; padding: 0;'>Password</p>
      <input type="password" name = "password" placeholder="Enter Password">
      <input type="submit" name = "log_user" value="Login">
			<p>
 		 New User? <a href="register.php">Create Account</a>
 	 </p>
  </div>
  </form>
</body>
</html>
