<?php
// если данных нет
if(!isset($_POST['moves']) || !isset($_POST['name']) || !isset($_POST['difficulty'])) {
  die('Not enough data');
}

// данные от пользователя
$moves = $_POST['moves'];
$name = $_POST['name'];
$difficulty = $_POST['difficulty'];

$settings = array(
    'host' => "mysql.hostinger.ru",
    "user" => "u638130651_sudok",
    "password" => "DtEhVzecA9",
    "db" => "u638130651_sudok"
);


$mysql = mysql_connect($settings['host'], $settings['user'], $settings['password']);

if(!$mysql) {
  die("no connection");
}

mysql_select_db($settings['db']);

// начинаем транзакцию
mysql_query("BEGIN");

$winner_insert_query = sprintf("INSERT INTO users(name)
                                  VALUES('%s')", $name);
$res = mysql_query($winner_insert_query);
if (!$res) {
  die('Неверный запрос: ' . mysql_error());
}

$insert_record_query = sprintf("INSERT INTO records(user_id, moves, difficulty)
                                  VALUES(%s, %s, %s)",
                               mysql_insert_id(), $moves, $difficulty);
$res = mysql_query($insert_record_query);
if (!$res) {
  mysql_query("ROLLBACK");
  die('Неверный запрос: ' . mysql_error());
}

mysql_query("COMMIT");


// Формируем запрос
$query = sprintf("SELECT records.*, users.name
                    FROM records
                    INNER JOIN users ON users.id = records.user_id
                    WHERE difficulty = %s",
                $difficulty);

// Выполняем запрос
$result = mysql_query($query);
// Проверяем результат
if (!$result) {
  die("Error while fetching winners.");
}

// Используем результат
$winners = array();
while ($row = mysql_fetch_assoc($result)) {
  array_push($winners, $row);
}

// для обработки клиентским скриптом нужно отдать json
echo(json_encode($winners));

?>