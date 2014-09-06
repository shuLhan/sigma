/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.SourceInfo", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_SourceInfo"
	,	title		:"Sumber Informasi"
	,	store		:Jx.app.store.References.SourceInfo
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

var References_SourceInfo = Ext.create ("Jx.app.References.SourceInfo");

//# sourceURL=module/References/SourceInfo/layout.js
