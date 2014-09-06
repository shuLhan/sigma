/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.College.Faculty", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_College_Faculty"
	,	title		:"Fakultas"
	,	store		:Jx.app.store.References.College.Faculty
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

var References_College_Faculty = Ext.create ("Jx.app.References.College.Faculty");

//# sourceURL=module/References/College/Faculty/layout.js
