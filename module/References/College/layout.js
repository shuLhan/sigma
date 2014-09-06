/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.College", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_College"
	,	title		:"Perguruan Tinggi"
	,	store		:Jx.app.store.References.College
	,	columns		:
		[{
			header		:"ID"
		,	dataIndex	:"id"
		,	hidden		:true
		,	editor		:
			{
				hidden		:true
			}
		},{
			header		:"Nama"
		,	dataIndex	:"name"
		,	flex		:1
		,	editor		:
			{
				allowBlank	:false
			}
		}]
	}
});

var References_College = Ext.create ("Jx.app.References.College");

//# sourceURL=module/References/College/layout.js
