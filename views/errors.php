<?php  if (count($errors) > 0) : ?>
    <div class="error">
    	<?php foreach ($errors as $error) : ?>
        <p style='z-index:1; position: absolute; bottom:222px; left: 41%; right: 59%; color: red; font-size:13px; width:fit-content; '><?php echo $error ?></p>
      <?php endforeach ?>
    </div>
  <?php  $userHint = $username ?>
  <?php  endif ?>
