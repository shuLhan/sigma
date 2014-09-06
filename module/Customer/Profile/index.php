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

,	"name"
,	"phone"
,	"address"

,	"college_id"
,	"college_faculty_id"
,	"college_major_id"
,	"college_degree_id"

,	"company_name"

,	"source_info_id"
,	"source_info_others"

,	"n_respondent"
,	"n_item"
,	"using_analysis_data"
,	"using_consultation"

,	"cost_add_1"
,	"cost_add_2"
,	"cost_add_3"
,	"cost_add_value_1"
,	"cost_add_value_2"
,	"cost_add_value_3"
,	"cost_total"

,	"payment_total"
];

Jaring::$_mod["db_table"]["name"]		= "customer";
Jaring::$_mod["db_table"]["read"]		= $fields;
Jaring::$_mod["db_table"]["search"]		= ["name", "phone", "address"];
Jaring::$_mod["db_table"]["order"]		= ["name"];
Jaring::$_mod["db_table"]["create"]		= $fields;
Jaring::$_mod["db_table"]["update"]		= array_slice ($fields, 3);
Jaring::$_mod["db_table"]["profiled"]	= false;

function request_create_before (&$data)
{
	foreach ($data as &$d)
	{
		$d["_user_id"] = Jaring::$_c_uid;
		$d["ts"] = time ();
	}

	return true;
}

Jaring::request_handle ("crud");
