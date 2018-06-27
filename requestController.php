<?php
declare(strict_types=1);
require('requestManager.php');
header('Content-Type:text/plain');


$user_name = 'root';
$db_password='';

try {
    $conn = new PDO("mysql:host=localhost;dbname=liste_chainee;charset=UTF8", $user_name, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
   // echo 'Connexion échouée : ' . $e->getMessage();
    die();
}


$request = $_REQUEST;


// faire switch de l'action pour savoir quelle methode appeler 
    // fetch la liste de la db
    // convertir en json
    // faire echo pour renvoyer au js

switch ($request['action']) {
    case 'getcountries':
        $countries = getCountries($conn);
        sendInJson($countries);
        break;
    
    case 'getdepartments':
        $departments = getDepartments($conn, (int)$request['id']);
        sendInJson($departments);
        break;

    case 'getcities':
        $cities = getCities($conn, (int)$request['id']);
        sendInJson($cities);
        break;

    case 'showcity':
        $city = getCityById($conn, (int)$request['id']);
        sendInJson($city[0]);
        break;
}


/**
 *  Converts a PHP array to Json and makes 
 *  the echo to return it to the js script
 */
function sendInJson(array $array) : void
{
    if (!headers_sent()) {
        header('Content-Type: application/json');
        echo json_encode($array);
    }
}