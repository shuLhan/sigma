/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Jx.app = {};
Jx.app.store = {};
Jx.app.store.References = {};
Jx.app.store.References.Payment = {};

Jx.app.store.References.College = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_College"
	,	url			:Jx.generateModDir ("References_College")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.College.Faculty = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_College_Faculty"
	,	url			:Jx.generateModDir ("References_College_Faculty")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.College.Major = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_College_Major"
	,	url			:Jx.generateModDir ("References_College_Major")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.College.Degree = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_College_Degree"
	,	url			:Jx.generateModDir ("References_College_Degree")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.SourceInfo = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_SourceInfo"
	,	url			:Jx.generateModDir ("References_SourceInfo")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.Payment.Type = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_Payment_Type"
	,	url			:Jx.generateModDir ("References_Payment_Type")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.Payment.Lot = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_Payment_Lot"
	,	url			:Jx.generateModDir ("References_Payment_Lot")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});

Jx.app.store.References.Bank = Ext.create ("Jx.StoreRest",
	{
		storeId		:"References_Bank"
	,	url			:Jx.generateModDir ("References_Bank")
	,	autoDestroy	:false
	,	fields		:["id", "name"]
	});
