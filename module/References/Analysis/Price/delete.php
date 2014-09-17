<?php
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
function delete_child_recursive ($id)
{
	$q = " select id from analysis_price where pid = $id ";

	$rs = Jaring::db_execute ($q, null, true);

	foreach ($rs as $row) {
		delete_child_recursive ($row["id"]);
	}

	$q = " delete from analysis_price where id = $id ";

	Jaring::db_execute ($q, null, false);
}

foreach ($data as $d)
{
	if (! empty ($d["id"])) {
		delete_child_recursive ($d["id"]);
	}
}

Jaring::$_out["success"]	= true;
Jaring::$_out["data"]		= Jaring::$MSG_SUCCESS_DESTROY;
