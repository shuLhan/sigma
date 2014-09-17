/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
//{{{ Grid
function Jx_References_Analysis_Price_Grid ()
{
	this.id = "References_Analysis_Price";
	this.dir = Jx.generateModDir (this.id);

	this.store				= Ext.create ("Jx.StoreTree", {
			url				:this.dir
		,	autoSync		:true
		,	fields			:
			[
				"id"
			,	"pid"
			,	"name"
			,	"base"
			,	"var_independent"
			,	"var_dependent"
			,	"var_intervening"
			,	"var_mediation"
			,	"var_moderation"
			,	"channel"
			,	"phase"	
			,	"segmentation"
			,	"attribute"
			,	"hierarchy"
			]
		});

	this.panel				= Ext.create ("Jx.GridTree", {
			itemId			:this.id +"_Grid"
		,	useArrows		:true
		,	rootVisible		:false
		,	showSearchField	:false
		,	store			:this.store
		,	plugins			:
			[
				Ext.create ("Ext.grid.plugin.CellEditing", {
					clicksToEdit:2
				})
			,	Ext.create ("Jx.plugin.CrudButtons")
			]
		,	columns			:
			[{
				header			:"ID"
			,	dataIndex		:"id"
			,	hidden			:true
			},{
				header			:"PID"
			,	dataIndex		:"pid"
			,	hidden			:true
			},{
				xtype			:"treecolumn"
			,	header			:"Nama"
			,	dataIndex		:"name"
			,	flex			:1
			},{
				header			:"Biaya Pokok"
			,	dataIndex		:"base"
			,	editor			:
				{
					xtype			:"numberfield"
				}
			},{
				header			:"Biaya Variabel"
			,	columns			:
				[{
					header			:"Independen"
				,	dataIndex		:"var_independent"
				,	editor			:
					{
						xtype			:"numberfield"
					}
				},{
					header			:"Dependen"
				,	dataIndex		:"var_dependent"
				,	editor			:
					{
						xtype			:"numberfield"
					}
				},{
					header			:"Intervening"
				,	dataIndex		:"var_intervening"
				,	editor			:
					{
						xtype			:"numberfield"
					}
				},{
					header			:"Mediasi"
				,	dataIndex		:"var_mediation"
				,	editor			:
					{
						xtype			:"numberfield"
					}
				},{
					header			:"Moderasi"
				,	dataIndex		:"var_moderation"
				,	editor			:
					{
						xtype			:"numberfield"
					}

				}]
			},{
				header		:"Channel"
			,	dataIndex	:"channel"
			,	editor		:
				{
					xtype		:"numberfield"
				}
			},{
				header		:"Tahap/Fase"
			,	dataIndex	:"phase"
			,	editor		:
				{
					xtype		:"numberfield"
				}
			},{
				header		:"Segmentasi"
			,	dataIndex	:"segmentation"
			,	editor		:
				{
					xtype		:"numberfield"
				}
			},{
				header		:"Level Atribut"
			,	dataIndex	:"attribute"
			,	editor		:
				{
					xtype		:"numberfield"
				}
			},{
				header		:"Hierarki"
			,	dataIndex	:"hierarchy"
			,	editor		:
				{
					xtype		:"numberfield"
				}
			}]
		});

	this.doRefresh = function (perm)
	{
		this.panel.fireEvent ("refresh", perm);
	};
}
//}}}
//{{{ Form
function Jx_References_Analysis_Price_Form ()
{
	this.id = "References_Analysis_Price";
	this.dir = Jx.generateModDir (this.id);

	this.store_parent = Ext.create ("Jx.StoreTree",
		{
			url			:Jx.generateModDir ("References_Analysis")
		,	fields		:
			[
				"id"
			,	"pid"
			,	"name"
			,	"text"
			]
		});

	this.cb_parent = Ext.create ("Ext.ux.TreeCombo", {
					name			:"pid"
				,	fieldLabel		:"Analisis induk"
				,	value			:0
				,	rootVisible		:false
				,	selectChildren	:false
				,	canSelectFolders:true
				,	store			:this.store_parent
				,	valueField		:"id"
				,	displayField	:"text"
				,	editable		:false
				});

	this.panel = Ext.create ("Jx.Form",
		{
			url				:this.dir
		,	itemId			:this.id +"_Form"
		,	syncUseStore	:false
		,	layout			:"anchor"
		,	defaults		:
			{
				xtype			:"numberfield"
			,	value			:0
			,	minValue		:0
			}
		,	items			:
			[{
				name			:"id"
			,	fieldLabel		:"id"
			,	hidden			:true
			},
				this.cb_parent
			,{
				xtype			:"textfield"
			,	name			:"name"
			,	fieldLabel		:"Nama analisis"
			},{
				name			:"base"
			,	fieldLabel		:"Biaya Pokok"
			},{
				xtype			:"fieldset"
			,	title			:"Biaya Variabel"
			,	defaults		:
				{
					xtype			:"numberfield"
				,	value			:0
				,	minValue		:0
				}
			,	items			:
				[{
					xtype			:"numberfield"
				,	name			:"var_independent"
				,	fieldLabel		:"Independen"
				},{
					xtype			:"numberfield"
				,	name			:"var_dependent"
				,	fieldLabel		:"Dependen"
				},{
					xtype			:"numberfield"
				,	name			:"var_intervening"
				,	fieldLabel		:"Intervening"
				},{
					xtype			:"numberfield"
				,	name			:"var_mediation"
				,	fieldLabel		:"Mediasi"
				},{
					xtype			:"numberfield"
				,	name			:"var_moderation"
				,	fieldLabel		:"Moderasi"
				}]
			},{
				xtype		:"fieldset"
			,	title		:"Biaya Spesifikasi"
			,	defaults	:
				{
					xtype			:"numberfield"
				,	value			:0
				,	minValue		:0
				}
			,	items		:
				[{
					xtype			:"numberfield"
				,	name			:"channel"
				,	fieldLabel		:"Channel"
				},{
					xtype			:"numberfield"
				,	name			:"phase"
				,	fieldLabel		:"Tahap/Fase"
				},{
					xtype			:"numberfield"
				,	name			:"segmentation"
				,	fieldLabel		:"Segmentasi"
				},{
					xtype			:"numberfield"
				,	name			:"attribute"
				,	fieldLabel		:"Level Atribut"
				},{
					xtype			:"numberfield"
				,	name			:"hierarchy"
				,	fieldLabel		:"Hierarki"
				}]
			}]
		});

	this.doRefresh = function (perm)
	{
		this.perm = 0;
		this.store_parent.load ();
	}
}
//}}}
//{{{ Panel
function Jx_References_Analysis_Price ()
{
	var self = this;
	this.id = "References_Analysis_Price";
	this.dir = Jx.generateModDir (this.id);
	this.perm = 0;
	this.grid = new Jx_References_Analysis_Price_Grid ();
	this.form = new Jx_References_Analysis_Price_Form ();

	this.form.panel.store = this.grid.store;

	this.panel = Ext.create ("Ext.container.Container",
		{
			itemId		:this.id
		,	layout		:"card"
		,	closable	:true
		,	title		:"Biaya Analisis"
		,	titleAlign	:"center"
		,	items		:
			[
				this.grid.panel
			,	this.form.panel
			]
		});

	this.doRefresh = function (perm)
	{
		this.perm = perm;
		this.grid.doRefresh (perm);
		this.form.doRefresh (perm);
	}

	this.grid.panel.doAdd = function ()
	{
		self.form.panel.getForm ().reset ();
		self.form.store_parent.reload ();
		self.panel.getLayout ().setActiveItem (1);
	}

	this.grid.panel.doEdit = function ()
	{
		self.panel.getLayout ().setActiveItem (1);
	}

	this.grid.panel.doDelete = function ()
	{
		self.form.panel.doSave ();
	}

	this.grid.panel.beforeSelectionChange = function (model, data)
	{
		if (data.length <= 0) {
			return;
		}

		self.form.panel.loadRecord (data[0]);
	}

	this.form.panel.afterFormCancel = function ()
	{
		self.panel.getLayout ().setActiveItem (0);
	}

	this.form.panel.afterFormSave = function ()
	{
		self.panel.getLayout ().setActiveItem (0);
	}
}
//}}}
var References_Analysis_Price = new Jx_References_Analysis_Price ();
