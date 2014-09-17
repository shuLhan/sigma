<?php
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
require_once "../../init.php";

$fields = [
	"id"
,	"pid"
,	"name"
];

Jaring::$_mod["db_table"]["name"]		= "analysis_price";
Jaring::$_mod["db_table"]["read"]		= $fields;
Jaring::$_mod["db_table"]["search"]		= ["name"];
Jaring::$_mod["db_table"]["order"]		= ["id", "pid"];
Jaring::$_mod["db_table"]["profiled"]	= false;

Jaring::request_handle ("crud");
