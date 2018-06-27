<?php
require('requestManager.php');

//var_dump(getCountries($conn));


$countries = [
    ['fance' => 'vvv'],
    ['belgique' => 'rrr']
    ];

$dbCountries = getCountries($conn);

//var_dump($dbCountries);


    
var_dump(json_encode($dbCountries));



