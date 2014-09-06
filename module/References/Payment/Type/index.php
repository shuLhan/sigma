<?php
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
require_once "../../../init.php";

$fields	= ["id","name"];

Jaring::$_mod["db_table"]["name"]		= "payment_type";
Jaring::$_mod["db_table"]["read"]		= $fields;
Jaring::$_mod["db_table"]["search"]		= ["name"];
Jaring::$_mod["db_table"]["order"]		= ["id"];
Jaring::$_mod["db_table"]["create"]		= $fields;
Jaring::$_mod["db_table"]["update"]		= array_slice ($fields, 1);
Jaring::$_mod["db_table"]["profiled"]	= false;

Jaring::request_handle ("crud");
