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

var Client_Payment = new Jx_Client_Payment ();
//}}}
