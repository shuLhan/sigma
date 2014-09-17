<?php
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
require_once "../../../init.php";

$fields = [
	"id"
,	"pid"
,	"name"
,	"base"
,	"var_independent"
,	"var_dependent"
,	"var_intervening"
,	"var_mediation"
,	"var_moderation"
,	"channel"
,	"phase"
,	"segmentation"
,	"attribute"
,	"hierarchy"
];

Jaring::$_mod["db_table"]["name"]		= "analysis_price";
Jaring::$_mod["db_table"]["read"]		= $fields;
Jaring::$_mod["db_table"]["search"]		= ["name"];
Jaring::$_mod["db_table"]["order"]		= ["id", "pid"];
Jaring::$_mod["db_table"]["create"]		= array_slice ($fields, 0, 3);
Jaring::$_mod["db_table"]["update"]		= array_slice ($fields, 1);
Jaring::$_mod["db_table"]["profiled"]	= false;

Jaring::request_handle ("crud");
