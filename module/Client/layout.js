/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
//{{{ Panel: client payment.
function Jx_Client_Payment ()
{
	var self = this;

	this.id = "Client_Payment";
	this.dir = Jx.generateModDir (this.id);
	this.perm = 0;

	//{{{ panel
	this.panel = Ext.create ("Jx.CardGridForm",
	{
		itemId		:this.id
	,	url			:this.dir
	,	title		:"Pembayaran"
	,	region		:"east"
	,	split		:true
	,	width		:"50%"
	,	closable	:false
	,	fields		:
		[{
			header		:"ID"
		,	dataIndex	:"id"
		,	hidden		:true
		,	editor		:
			{
				hidden		:true
			}
		},{
			header		:"Client ID"
		,	dataIndex	:"client_id"
		,	hidden		:true
		,	editor		:
			{
				hidden		:true
			}
		},{
			header		:"Tanggal"
		,	width		:100
		,	dataIndex	:"pay_date"
		,	xtype		:"datecolumn"
		,	format		:"Y-m-d"
		,	editor		:
			{
				xtype		:"datefield"
			,	format		:"Y-m-d"
			,	allowBlank	:false
			,	value		:new Date ()
			}
		},{
			header		:"Untuk"
		,	dataIndex	:"payment_lot_id"
		,	renderer	:Jx.app.store.References.Payment.Lot.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combobox"
			,	store			:Jx.app.store.References.Payment.Lot
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			,	allowBlank		:false
			}
		},{	
			header		:"Cara"
		,	dataIndex	:"payment_type_id"
		,	width		:160
		,	renderer	:Jx.app.store.References.Payment.Type.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combobox"
			,	itemId			:"payment_type_id"
			,	store			:Jx.app.store.References.Payment.Type
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			,	allowBlank		:false
			}
		},{
			header		:"Bank Sumber"
		,	dataIndex	:"bank_source_id"
		,	renderer	:Jx.app.store.References.Bank.renderData ("id", "name")
		,	hidden		:true
		,	editor		:
			{
				xtype			:"combobox"
			,	itemId			:"bank_source_id"
			,	store			:Jx.app.store.References.Bank
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		},{
			header		:"Bank Tujuan"
		,	dataIndex	:"bank_dest_id"
		,	renderer	:Jx.app.store.References.Bank.renderData ("id", "name")
		,	hidden		:true
		,	editor		:
			{
				xtype			:"combobox"
			,	itemId			:"bank_dest_id"
			,	store			:Jx.app.store.References.Bank
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		},{
			header		:"Kode Transaksi / No. Kwitansi"
		,	dataIndex	:"receipt_code"
		,	width		:160
		,	editor		:{}
		},{
			header		:"Jumlah"
		,	dataIndex	:"total"
		,	flex		:1
		,	editor		:
			{
				xtype		:"numberfield"
			,	allowBlank	:false
			}
		}]
	});
	//}}}
	this.cb_payment_type_id = this.panel.form.down ("#payment_type_id");
	this.f_bank_src = this.panel.form.down ("#bank_source_id");
	this.f_bank_dst = this.panel.form.down ("#bank_dest_id");

	this.cb_payment_type_id.on ("change", function (cmp, newv, oldv)
	{
		switch (newv) {
		case 1: // cash
			this.f_bank_src.setDisabled (true);
			this.f_bank_dst.setDisabled (true);
			break;
		case 2: // transfer
			this.f_bank_src.setDisabled (false);
			this.f_bank_dst.setDisabled (false);
			break;
		case 3:	// debit
			this.f_bank_src.setDisabled (false);
			this.f_bank_dst.setDisabled (true);
			break;
		}
	}, this);

	//{{{ f : doRefresh.
	this.doRefresh = function (perm, client_id)
	{
		this.perm = perm;

		if (client_id == 0) {
			self.panel.grid.clearData ();
		} else {
			self.panel.grid.store.proxy.extraParams.client_id = client_id;
			self.panel.grid.doRefresh (perm);
		}
	};
	//}}}
}
//}}}
//{{{ Panel: Client Profile.
function Jx_Client_Profile ()
{
	var self = this;

	this.id = "Client_Profile";
	this.dir = Jx.generateModDir (this.id);
	this.perm = 0;
	this.payment = new Jx_Client_Payment ();

	//{{{ radiogroup: college or company
	this.college_or_company = Ext.create ("Ext.form.RadioGroup",
		{
			xtype	:"radiogroup"
		,	columns	:1
		,	items	:
			[{
				boxLabel	:"Perguruan Tinggi"
			,	name		:"college_or_company"
			,	inputValue	:1
			,	checked		:true
			},{
				boxLabel	:"Perusahaan"
			,	name		:"college_or_company"
			,	inputValue	:2
			}]
		});
	//}}}
	//{{{ fieldset: profile.
	this.fs_profile =
		{
			header		:"Klien Profil"
		,	fsConfig	:
			{
				padding		:10
			}
		,	columns	:
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
			,	width		:200
			,	editor		:
				{
					allowBlank	:false
				}
			},{
				header		:"Telepon/HP"
			,	dataIndex	:"phone"
			,	editor		:
				{
					xtype			:"numberfield"
				,	allowBlank		:false
				,	allowDecimals	:false
				,	hideTrigger		:true
				}
			},{
				header		:"Alamat"
			,	dataIndex	:"address"
			,	hidden		:true
			,	editor		:
				{
					xtype		:"textarea"
				}
			},{
				hidden		:true
			,	editor		:this.college_or_company
			}]
		};

	//}}}
	//{{{ fieldset: college.
	this.fs_college =
	{
		header		:"Perguruan Tinggi"
	,	fsConfig	:
		{
			padding		:10
		,	itemId		:"fs_college"
		}
	,	columns		:
		[{
			header		:"Nama"
		,	dataIndex	:"college_id"
		,	renderer	:Jx.app.store.References.College.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combo"
			,	store			:Jx.app.store.References.College
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		},{
			header		:"Fakultas"
		,	dataIndex	:"college_faculty_id"
		,	hidden		:true
		,	renderer	:Jx.app.store.References.College.Faculty.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combo"
			,	store			:Jx.app.store.References.College.Faculty
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		},{
			header		:"Jurusan"
		,	dataIndex	:"college_major_id"
		,	hidden		:true
		,	renderer	:Jx.app.store.References.College.Major.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combo"
			,	store			:Jx.app.store.References.College.Major
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		},{
			header		:"Pendidikan"
		,	dataIndex	:"college_degree_id"
		,	width		:200
		,	renderer	:Jx.app.store.References.College.Degree.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combo"
			,	store			:Jx.app.store.References.College.Degree
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		}]
	};
	//}}}
	//{{{ fieldset: company.
	this.fs_company =
	{
		header		:"Perusahaan"
	,	hidden		:true
	,	fsConfig	:
		{
			padding		:10
		,	disabled	:true
		,	itemId		:"fs_company"
		}
	,	columns		:
		[{
			header		:"Nama"
		,	dataIndex	:"company_name"
		,	hidden		:true
		,	editor		:{}
		}]
	};
	//}}}
	//{{{ fieldset: source information.
	this.fs_sourceinfo = 
	{
		header		:"Sumber Informasi Mengetahui Sigma"
	,	hidden		:true
	,	fsConfig	:
		{
			padding		:10
		}
	,	columns		:
		[{
			dataIndex	:"source_info_id"
		,	hidden		:true
		,	renderer	:Jx.app.store.References.SourceInfo.renderData ("id", "name")
		,	editor		:
			{
				xtype			:"combo"
			,	itemId			:"source_info_id"
			,	store			:Jx.app.store.References.SourceInfo
			,	valueField		:"id"
			,	displayField	:"name"
			,	editable		:false
			}
		},{
			dataIndex	:"source_info_others"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"textarea"
			,	itemId		:"source_info_others"
			,	hidden		:true
			}
		}]
	};
	//}}}
	//{{{ fieldset: cost.
	this.fs_cost =
	{
		header		:"Biaya"
	,	fsConfig	:
		{
			padding		:10
		}
	,	columns		:
		[{
			header		:"Jumlah Responden"
		,	dataIndex	:"n_respondent"
		,	hidden		:true
		,	editor		:
			{
				xtype			:"numberfield"
			,	allowDecimals	:false
			,	hideTrigger		:true
			,	minValue		:0
			}
		},{
			header		:"Jumlah Item"
		,	dataIndex	:"n_item"
		,	hidden		:true
		,	editor		:
			{
				xtype			:"numberfield"
			,	allowDecimals	:false
			,	hideTrigger		:true
			,	minValue		:0
			}
		},{
			header		:"Analisis Data"
		,	dataIndex	:"using_analysis_data"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"checkbox"
			,	inputValue	:1
			}
		},{
			header		:"Konsultasi"
		,	dataIndex	:"using_consultation"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"checkbox"
			,	inputValue	:1
			}
		},{
			header		:"Biaya Lain #1"
		,	dataIndex	:"cost_add_1"
		,	hidden		:true
		,	editor		:{}
		},{
			header		:"Nilai"
		,	dataIndex	:"cost_add_value_1"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"numberfield"
			,	itemId		:"cost_add_value_1"
			}
		},{
			header		:"Biaya Lain #2"
		,	dataIndex	:"cost_add_2"
		,	hidden		:true
		,	editor		:{}
		},{
			header		:"Nilai"
		,	dataIndex	:"cost_add_value_2"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"numberfield"
			,	itemId		:"cost_add_value_2"
			}
		},{
			header		:"Biaya Lain #3"
		,	dataIndex	:"cost_add_3"
		,	hidden		:true
		,	editor		:{}
		},{
			header		:"Nilai"
		,	dataIndex	:"cost_add_value_3"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"numberfield"
			,	itemId		:"cost_add_value_3"
			}
		},{
			header		:"Total"
		,	dataIndex	:"cost_gross"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"displayfield"
			,	itemId		:"cost_gross"
			}
		},{
			header		:"Pajak 10%"
		,	dataIndex	:"cost_tax"
		,	hidden		:true
		,	editor		:
			{
				xtype		:"displayfield"
			,	itemId		:"cost_tax"
			}
		},{
			header		:"Total dengan Pajak"
		,	dataIndex	:"cost_total"
		,	editor		:
			{
				xtype		:"displayfield"
			,	itemId		:"cost_total"
			}
		}]
	};
	//}}}
	//{{{ panel : profile.
	this.panel = Ext.create ("Jx.CardGridForm",
	{
		itemId		:this.id
	,	url			:this.dir
	,	title		:"Profil"
	,	region		:"center"
	,	closable	:false
	,	formConfig	:
		{
			layout		:"column"
		,	defaults	:
			{
				margin		:"0 4 0 0"
			}
		,	fieldDefaults	:
			{
				labelAlign		:"right"
			,	labelWidth		:120
			,	width			:340
			}
		}
	,	fields	:
		[
			this.fs_profile
		,	this.fs_company
		,	this.fs_college
		,	this.fs_sourceinfo
		,	this.fs_cost
		]
	});
	//}}}
	//{{{ components.
	this._fs_sourceinfo = this.panel.form.down ("#source_info_id");
	this._ta_source_others = this.panel.form.down ("#source_info_others");
	this.cost1 = this.panel.form.down ("#cost_add_value_1");
	this.cost2 = this.panel.form.down ("#cost_add_value_2");
	this.cost3 = this.panel.form.down ("#cost_add_value_3");
	this.cost_gross = this.panel.form.down ("#cost_gross");
	this.tax = this.panel.form.down ("#cost_tax");
	this.cost_total = this.panel.form.down ("#cost_total");
	//}}}
	//{{{ radiogroup college_or_company on change.
	this.college_or_company.on ("change", function (cmp, newv, oldv)
	{
		switch (newv.college_or_company) {
		case 1:
			self.panel.form.down ("#fs_college").setDisabled (false)
			self.panel.form.down ("#fs_company").setDisabled (true);
			break;
		case 2:
			self.panel.form.down ("#fs_college").setDisabled (true);
			self.panel.form.down ("#fs_company").setDisabled (false);
			break;
		}
	});
	//}}}
	//{{{ sourceinfo on change
	this._fs_sourceinfo.on ("change", function (cmp, newv, oldv)
	{
		if (newv === 99) {
			self._ta_source_others.show ();
		} else {
			self._ta_source_others.hide ();
		}
	});
	//}}}
	this.compute_total = function ()
	{
		var c1 = this.cost1.getValue ();
		var c2 = this.cost2.getValue ();
		var c3 = this.cost3.getValue ();

		var gross = c1 + c2 + c3;
		var taxed = Math.round ((0.1 * gross) * 100)/ 100

		this.cost_gross.setValue (gross);
		this.tax.setValue (taxed);
		this.cost_total.setValue (gross + taxed);
	}

	this.cost1.on ("change", this.compute_total, this);
	this.cost2.on ("change", this.compute_total, this);
	this.cost3.on ("change", this.compute_total, this);
	//{{{ f : doRefresh.
	this.doRefresh = function (perm)
	{
		this.perm = perm;
		this.panel.grid.doRefresh (perm);
	};
	//}}}
}
//}}}
//{{{ Main
function Jx_Client ()
{
	var self = this;

	this.id = "Client";
	this.dir = Jx.generateModDir (this.id);
	this.perm = 0;
	this.client_profile = new Jx_Client_Profile ();
	this.client_payment = new Jx_Client_Payment ();

	this.panel = Ext.create ("Ext.panel.Panel",
	{
		itemId		:"Client"
	,	title		:"Klien"
	,	titleAlign	:"center"
	,	closable	:true
	,	layout		:"border"
	,	items		:
		[
			this.client_profile.panel
		,	this.client_payment.panel
		]
	});

	this.doRefresh = function (perm)
	{
		this.perm = perm;

		Jx.chainStoreLoad (
			[
				Jx.app.store.References.College
			,	Jx.app.store.References.College.Faculty
			,	Jx.app.store.References.College.Major
			,	Jx.app.store.References.College.Degree
			,	Jx.app.store.References.Payment.Type
			,	Jx.app.store.References.Payment.Lot
			,	Jx.app.store.References.Bank
			]
		,	function ()
			{
				self.client_profile.doRefresh (perm);
				self.client_payment.doRefresh (perm, 0);
			}
		,	0);
	}

	this.client_profile.panel.grid.afterSelectionChange = function (model, data)
	{
		if (data.length <= 0) {
			return;
		}
		self.client_payment.doRefresh (self.perm, data[0].get ("id"));
		self.client_profile.compute_total ();
	}
}
//}}}
//}}}

var Client = new Jx_Client ();

//# sourceURL=module/Client/layout.js
