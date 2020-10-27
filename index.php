<?php
session_start();
date_default_timezone_set("Europe/Moscow");
$start = microtime(true);
$result = false;
$_GET["Y"] = str_replace(',','.',$_GET["Y"]);
if (!is_numeric($_GET["X"])){
    echo '<script>showError(document.getElementById("CheckX_1").parentElement.parentElement,"X is missed !")';
    return;
}
if (!is_numeric($_GET["R"])){
    echo '<script>showError(document.getElementById("CheckR_1").parentElement.parentElement,"R is missed !")';
    return;
}
if (!is_numeric($_GET["Y"])){
    echo '<script>showError(document.getElementById("CheckY").parentElement.parentElement,"Y is NaN !")';
    return;
}
if ($_GET["Y"] < -5 || $_GET["Y"] > 5){
    echo '<script>showError(document.getElementById("CheckY").parentElement.parentElement,"Number must be in range -5 ... 5")';
    return;
}
if ($_GET["Y"] >= 0 and $_GET["X"] <= 0){
    if ($_GET["Y"]*$_GET["Y"] + $_GET["X"]*$_GET["X"] <= $_GET["R"]*$_GET["R"]){
        $result = true;
    }
}
if ($_GET["Y"] <= 0 and $_GET["X"] <= 0){
    if ($_GET["X"] >= $_GET["R"] and $_GET["Y"] >= $_GET["R"]/2){
        $result = true;
    }
}
if ($_GET["Y"] <= 0 and $_GET["X"] >= 0){
    if ($_GET["Y"] >= $_GET["X"] - $_GET["R"]/2){
        $result = true;
    }
}
if (!$result){
    $result = 0;
}
//    $_SESSION['tables'] = $_SESSION['tables'] . '<script> addRow(' . $_GET["X"] . ','. $_GET["Y"] . ','. $_GET["R"] .','. $result .','. number_format(microtime(true)-$start,5) . ', "'. date('H:i:s') .'")</script>' ;
//    echo $_SESSION['tables'];
echo  $_GET["X"] . ','. $_GET["Y"] . ','. $_GET["R"] .','. $result .','. number_format(microtime(true)-$start,5) . ', '. date('H:i:s');
?>