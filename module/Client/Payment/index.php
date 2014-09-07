<?php
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
require_once "../../init.php";

$fields	= [
	"id"
,	"_user_id"
,	"ts"

,	"client_id"
,	"pay_date"
,	"payment_lot_id"
,	"payment_type_id"

,	"bank_source_id"
,	"bank_dest_id"

,	"receipt_code"
,	"total"
];

Jaring::$_mod["db_table"]["name"]		= "client_payment";
Jaring::$_mod["db_table"]["read"]		= $fields;
Jaring::$_mod["db_table"]["search"]		= ["receipt_code"];
Jaring::$_mod["db_table"]["order"]		= ["pay_date DESC"];
Jaring::$_mod["db_table"]["create"]		= $fields;
Jaring::$_mod["db_table"]["update"]		= array_slice ($fields, 3);
Jaring::$_mod["db_table"]["profiled"]	= false;

function request_create_before (&$data)
{
	foreach ($data as &$d) {
		$d["_user_id"] = Jaring::$_c_uid;
		$d["ts"] = time ();
	}
	return true;
}

Jaring::request_handle ("crud");
