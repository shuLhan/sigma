/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.Payment.Type", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_Payment_Type"
	,	title		:"Tipe Pembayaran"
	,	store		: Ext.create ("Jx.StoreRest",
		{
			url		:Jx.generateModDir ("References_Payment_Type")
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

var References_Payment_Type = Ext.create ("Jx.app.References.Payment.Type");

//# sourceURL=module/References/Payment/Type/layout.js
