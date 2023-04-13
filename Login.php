<?php
session_start();
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
  if (isset($_GET['lg']) && $_GET['lg'] == "false") {
    session_destroy();
    session_unset();
    session_regenerate_id();
  }
  header('Location:' . 'index.php');
} else {
  if (isset($_POST["ice"])) {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('SELECT * FROM entreprise where nb_ICE=:u and password=:p');
    $req->execute(['u' => $_POST["ice"], 'p' => $_POST["password"]]);
    $res = $req->fetchAll();
    if (count($res) > 0) {
      $_SESSION['loggedin'] = true;
      $_SESSION['ice'] = $_POST["ice"];
      header('Location:' . 'accueil.php');
    }
  }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Facture logger</title>
  <link rel="stylesheet" href="login.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous" />
</head>

<body>
  <div class="contenaira ">
    <img src=" Assets/image1.jpg" class="position-absolute z-n1 object-fit-cover w-100 h-100">
    <div class="formus p-3 rounded text-center scale-up-center">
      <div class="w-100">
        <h1>Identifier votre entreprise</h1>
        <p class="m-3">Connectez-Vous</p>
      </div>
      <form action="Login.php" method="post">
        <label for="ice" name="ICE">Votre ICE</label><input type="text" id="ice" name="ice" required />
        <label for="password">Mot de passe</label><input name="password" id="password" type="password" required />
        <input type="submit" class="button-signup rounded" value="Login" />
        <a href="SignUp.php" class="text-center">Pas encore inscrit ?</a>
      </form>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
    crossorigin="anonymous"></script>
</body>

</html>