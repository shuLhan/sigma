<?php
require_once "../../../init.php";

Jaring::$_mod["db_table"]["name"]	= "_user_group";
Jaring::$_mod["db_table"]["id"]		= ["id"];
Jaring::$_mod["db_table"]["create"]	= ["_group_id", "_user_id"];
Jaring::$_mod["db_table"]["update"]	= ["_user_id"];
Jaring::$_mod["db_table"]["generate_id"] = "id";

Jaring::handleRequest ();
