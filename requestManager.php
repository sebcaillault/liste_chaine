<?php
declare(strict_types=1);


/**
 * Returns array with all the countries
 */
function getCountries(PDO $conn) : array
{
    $countries = [];
    $sql = 'SELECT * FROM `pays` ORDER BY `pays_nom` ASC';

    $query = $conn->prepare($sql);
    $query->execute();

    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $countries[] = $row;
    }

    return $countries;
}



/**
 * Returns array with all the departments 
 */
function getDepartments(PDO $conn, int $id) : array
{
    $sql = 'SELECT * FROM `departement` JOIN `pays` ON `departement_pays` = `pays_id` WHERE `pays_id` = :id  ORDER BY `departement_nom` ASC';

    $query = $conn->prepare($sql);
    $query->bindValue('id', $id, PDO::PARAM_INT);
    $query->execute();
    $regions = $query->fetchAll();

    return $regions;
}



/**
 * Returns array with all the departments 
 */
function getCities(PDO $conn, int $id) : array
{
    $sql = 'SELECT * FROM `ville` JOIN `departement` ON `ville_departement` = `departement_code` WHERE `departement_code` = :id  ORDER BY `ville_nom_reel` ASC';

    $query = $conn->prepare($sql);
    $query->bindValue('id', $id, PDO::PARAM_INT);
    $query->execute();
    $cities = $query->fetchAll();

    return $cities;
}



/**
 * Returns info if a single city
 */
function getCityById(PDO $conn, int $id) : array
{
    $sql = 'SELECT * FROM `ville` WHERE `ville_id` = :id';

    $query = $conn->prepare($sql);
    $query->bindValue('id', $id, PDO::PARAM_INT);
    $query->execute();
    $city = $query->fetchAll();

    return $city;
}











