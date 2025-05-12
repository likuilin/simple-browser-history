<?php
class AdminerLoginBypass {
  function __construct() {
    if ($_SERVER["REQUEST_URI"] == "/") {
      $_POST["auth"] = array(
        "driver" => "server",
        "server" => "db",
        "username" => "web",
        "password" => "web",
        "db" => "browserhistory"
      );
    }
  }

  function credentials() {
    return array("db", "web", "web");
  }

  function login($login, $password) {
    return true;
  }
}
