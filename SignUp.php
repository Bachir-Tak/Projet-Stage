<?php
session_start();
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
  header('Location:' . 'index.php');
} else {
  if (isset($_POST["ice"])) {
    try {
      $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
      $sql = 'INSERT INTO entreprise(nb_ICE, password,forme_juridique,activite,id_fiscal) VALUES (:u, :p, :z, :x, :q)';
      $req = $db->prepare($sql);
      $req->execute(['u' => $_POST["ice"], 'p' => $_POST["password"], 'z' => $_POST["formejuridique"], 'x' => $_POST["activite"], 'q' => $_POST["identifiantfiscal"]]);
      $res = $req->fetchAll();
      header('Location:' . 'index.php');
    } catch (PDOException $e) {
      echo $e->getMessage();
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
  <title>SignUp</title>
  <link rel="stylesheet" href="signup.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous" />
  <script src="https://kit.fontawesome.com/22e134f562.js" crossorigin="anonymous"></script>

</head>

<body>
  <div class="contenaira ">
    <img src=" Assets/image1.jpg" class="position-absolute z-n1 object-fit-cover w-100 h-100">
    <div class="formus  p-3 rounded text-center scale-up-center">
      <div class="w-100">
        <a href="Login.php"><i class="fas fa-arrow-left"></i></a>
        <h1>Identifier votre entreprise</h1>
        <p>Saisissez vos informations</p>
      </div>
      <form action="SignUp.php" method="post">
        <label for="ice" name="ICE">Votre ICE</label>
        <input type="number" id="ice" name="ice" required />
        <label for="formejuridique">Forme juridique </label>
        <select name="formejuridique" id="formejuridique">
          <option value=""></option>
          <option value="sas">S.A.S</option>
          <option value="sarl">S.A.R.L</option>
          <option value="sasu">S.A.S.U</option>
          <option value="eurl">E.U.R.L</option>
          <option value="ei">E.I</option>
          <option value="eirl">E.I.R.L</option>
        </select>
        <label for="activite">Activité</label>
        <input name="activite" id="activite" type="text" required />
        <label for="identifiantfiscal">Identifiant fiscal</label>
        <input name="identifiantfiscal" id="identifiantfiscal" type="text" required />
        <label for="password">Mot de passe</label><input name="password" id="password" type="password" required />

        <input class="button-signup rounded" type="submit" value="Sign-up" />
      </form>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
    crossorigin="anonymous"></script>
</body>

</html>