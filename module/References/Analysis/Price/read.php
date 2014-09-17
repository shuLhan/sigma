<?php
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
function get_analysis ($pid, $depth)
{
	$q	="
			select		A.id
			,			A.pid
			,			A.name
			,			A.name		as label
			,			A.base
			,			A.var_independent
			,			A.var_dependent
			,			A.var_intervening
			,			A.var_mediation
			,			A.var_moderation
			,			A.channel
			,			A.phase
			,			A.segmentation
			,			A.attribute
			,			A.hierarchy
			from		analysis_price	A
			where		A.pid			= $pid
			order by	A.id
		";

	$rs = Jaring::db_execute ($q, null, true);

	$index = 0;
	foreach ($rs as &$m) {
		$id = $m["id"];

		if ($index === 0) {
			$m["isFirst"] = true;
		} else {
			$m["isFirst"] = false;
		}

		$m["iconCls"]	= "group";
		$m["index"] 	= $index++;
		$m["depth"]		= $depth;

		$c = get_analysis ($id, $depth + 1);

		if (count ($c) <= 0) {
			$m["leaf"]			= true;
		} else {
			$m["children"]		= $c;
			$m["expandable"]	= true;
			$m["expanded"]		= true;
			$m["loaded"]		= true;
		}
	}

	return $rs;
}

$data = get_analysis (0, 0);

Jaring::$_out["success"]	= true;
Jaring::$_out["children"]	= $data;
