/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
//{{{ Panel: Client Profile.
function Jx_Client_Profile ()
{
	var self = this;

	this.id = "Client_Profile";
	this.dir = Jx.generateModDir (this.id);
	this.perm = 0;

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
			header		:"Total tanpa pajak"
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
			header		:"Total"
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

var Client_Profile = new Jx_Client_Profile ();
//}}}
