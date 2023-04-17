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