/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.College.Degree", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_College_Degree"
	,	title		:"Jenjang Pendidikan"
	,	store		:Jx.app.store.References.College.Degree
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

var References_College_Degree = Ext.create ("Jx.app.References.College.Degree");

//# sourceURL=module/References/College/Degree/layout.js
