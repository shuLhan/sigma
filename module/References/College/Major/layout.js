/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.College.Major", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_College_Major"
	,	title		:"Jurusan"
	,	store		: Ext.create ("Jx.StoreRest",
		{
			url		:Jx.generateModDir ("References_College_Major")
		,	fields	:
			[
				"id"
			,	"name"
			]
		})
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

var References_College_Major = Ext.create ("Jx.app.References.College.Major");

//# sourceURL=module/References/College/Major/layout.js
