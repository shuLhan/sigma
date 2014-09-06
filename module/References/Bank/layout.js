/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.app.References.Bank", {
	extend	:"Jx.GridPaging.FormEditor"
,	config	:
	{
		itemId		:"References_Bank"
	,	title		:"Tipe Pembayaran"
	,	store		:Jx.app.store.References.Bank
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

var References_Bank = Ext.create ("Jx.app.References.Bank");

//# sourceURL=module/References/Bank/layout.js
