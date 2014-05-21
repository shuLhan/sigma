/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.QuickTips.init();

/*
	Various fixes for ExtJS bugs.
*/

/* Tooltip windows too small */
delete Ext.tip.Tip.prototype.minWidth;

/* Row editor is not sending "edit" event when column locked is true */
Ext.override (Ext.grid.locking.View, {
	focus: function() {
		var p = this.getSelectionModel().getCurrentPosition(),
			v = p && p.view ? p.view : this.normalView;

		v.focus();
    }
});

/*
	Default properties for Ext components.
*/

/*
	Ext.data.Store.
	- Add function renderData to store, to render column using store.
*/
Ext.override (Ext.data.Store, {
	renderData	:function (valueField, displayField)
		{
			var store = this;
			return function (v) {
				var i = store.find (valueField, v);
				if (i < 0) {
					return v;
				}
				var r = store.getAt (i);
				return r ? r.get (displayField) : "[no data found]";
			};
		}
	});

/*
	Register our application.
*/
Ext.application ({
	name		:"Jx"
,	appFolder	:_g_root +"js/jx"
,	appProperty	:""
});

Jx = {
	pageSize	:_g_paging_size
,	msg			:
	{
		el				:""
	,	AJAX_FAILURE	:"AJAX communication failed."
	,	AJAX_SUCCESS	:"Data has been saved."
	,	ACTION_UNKNOWN	:"Unknown action "
	,	CLIENT_INVALID	:"Form fields may not be submitted with invalid values."
	,	SERVER_ERROR	:"Server request error."

	,	display 		:function (title, format, cls, delay)
		{
			if (! this.el) {
				this.el = Ext.DomHelper.insertFirst (document.body, {id:'jx-msg'}, true);
			}
			var s = Ext.String.format.apply (String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append (this.el
					, '<div class="'+ cls +'"><h3>' + title + '</h3><p>' + s + '</p></div>'
					, true);
			m.hide();
			m.slideIn ("t").ghost ("t", { delay: delay, remove: true });
		}

	,	info	:function (format)
		{
			this.display ("Information", format, "info", 2000);
		}

	,	error	:function (format)
		{
			this.display ("Error", format, "error", 4000);
		}

	,	confirm	:function (yesCallback, scope)
		{
			Ext.Msg.confirm (
				"Confirmation"
			,	"Selected data will be deleted. <br/> Are you sure?"
			,	function (buttonId, text, me)
				{
					if (buttonId == "yes") {
						if (yesCallback && typeof (yesCallback) === "function") {
							yesCallback.call (scope);
						}
					}
				}
			);
		}

	,	saveChanges	:function (cb, scope)
		{
			Ext.Msg.show ({
				title	:'Save Changes?'
			,	msg		:'You are leaving module that has unsaved changes. Would you like to save your changes?'
			,	buttons	:Ext.Msg.YESNOCANCEL
			,	icon	:Ext.Msg.QUESTION
			,	fn		:cb
			,	scope	:scope
			});
		}
	}
,	mask		:undefined
,	showMask	:function ()
	{
		if (undefined === this.mask) {
			this.mask = Ext.create ("Ext.LoadMask", {
				target		:Ext.getBody ()
			});
		}
		this.mask.show ();
	}
,	hideMask	:function ()
	{
		if (undefined !== this.mask) {
			this.mask.hide ();
		}
	}

	/*
		@return: module directory.
	*/
,	generateModDir	:function (id)
	{
		return _g_module_dir + id.replace (/_/g, "/") +"/";
	}
};
/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
/*
	Plugin requirements:
	- parent component containt store.
 */
Ext.define ("Jx.plugin.CrudButtons", {
	extend	:"Ext.AbstractPlugin"
,	alias	:"jx.plugin.crudbuttons"

,	config	:
	{
		// order of buttons on toolbar
		buttonBarList		:["delete", "-", "edit", "add", "-", "refresh"]

		// true to show icon and text on buttons.
	,	buttonShowText		:false
	}

,	constructor	:function (config)
	{
		Ext.apply(this, config);
		this.callParent (arguments);
	}

,	init	:function (cmp)
	{
		/* Get or create top toolbar */
		var b		= undefined;
		var tbar	= undefined;
		var tbars	= cmp.getDockedItems ("toolbar[dock='top']");

		if (tbars.length > 0) {
			tbar = tbars[0];
		}

		if (undefined === tbar) {
			tbar		= Ext.create ("Ext.toolbar.Toolbar", {
				dock	:"top"
			});
			cmp.addDocked (tbar);
		}

		/* Show/hide button based on user configuration */
		for (var i = 0; i < this.buttonBarList.length; i++) {
			switch (this.buttonBarList[i]) {
			case "-":
				tbar.add (Ext.create ("Ext.toolbar.Separator"));
				break;

			case "add":
				cmp.buttonAdd		= Ext.create ("Ext.button.Button", {
						text		:this.buttonShowText ? "Add" : ""
					,	itemId		:"add"
					,	iconCls		:"add"
					,	disabled	:true
					,	tooltip		:"Add new record"
					});

				cmp.buttonAdd.setHandler (this._doAdd, this);
				tbar.add (cmp.buttonAdd);
				break;

			case "edit":
				cmp.buttonEdit		= Ext.create ("Ext.button.Button", {
						text		:this.buttonShowText ? "Edit" : ""
					,	itemId		:"edit"
					,	iconCls		:"edit"
					,	disabled	:true
					,	tooltip		:"Edit selected record"
					});

				cmp.buttonEdit.setHandler (this._doEdit, this);
				tbar.add (cmp.buttonEdit);
				break;

			case "delete":
				cmp.buttonDelete	= Ext.create ("Ext.button.Button", {
						text		:this.buttonShowText ? "Delete" : ""
					,	itemId		:"delete"
					,	iconCls		:"delete"
					,	disabled	:true
					,	tooltip		:"Delete selected record"
					});

				cmp.buttonDelete.setHandler (this._doDelete, this);
				tbar.add (cmp.buttonDelete);
				break;

			case "refresh":
				cmp.buttonRefresh	= Ext.create ("Ext.button.Button", {
						text		:this.buttonShowText ? "Refresh" : ""
					,	itemId		:"refresh"
					,	iconCls		:"refresh"
					,	disabled	:false
					,	tooltip		:"Refresh data"
					});

				cmp.buttonRefresh.setHandler (this._doRefresh, this);
				tbar.add (cmp.buttonRefresh);
				break;
			}
		}

		cmp.on ("selectionchange", this._onSelectionChange, this);
		cmp.on ("refresh", this._doRefresh, this);
	}

,	destroy	:function ()
	{
		this.cmp.un ("refresh", this._doRefresh, this);
		this.cmp.un ("selectionchange", this._onSelectionChange, this);
	}

/*
	beforeAdd	:function, overridden by instance, return false to cancel.
	afterAdd	:function, overridden by instance.
*/
,	_doAdd		:function ()
	{
		if (this.cmp.beforeAdd && typeof (this.cmp.beforeAdd) === "function") {
			if (this.cmp.beforeAdd () === false) {
				return false;
			}
		}

		if (this.cmp.perm < 2) {
			return false;
		}

		this.cmp.store.proxy.extraParams.action	= this.cmp.store.action = "create";

		if (this.cmp.doAdd && (typeof (this.cmp.doAdd) === "function")) {
			this.cmp.doAdd ();
		}

		if (this.cmp.afterAdd && typeof (this.cmp.afterAdd) === "function") {
			this.cmp.afterAdd ();
		}

		return true;
	}

/*
	beforeEdit	:function, overridden by instance, return false to cancel.
	afterEdit	:function, overridden by instance.
*/
,	_doEdit		:function ()
	{
		if (this.cmp.beforeEdit && typeof (this.cmp.beforeEdit) === "function") {
			if (this.cmp.beforeEdit () === false) {
				return false;
			}
		}
		if (this.cmp.perm < 3) {
			return false;
		}

		this.cmp.store.proxy.extraParams.action	= this.cmp.store.action = "update";

		if (this.cmp.selectedData.length <= 0) {
			return false;
		}

		if (this.cmp.doEdit && (typeof (this.cmp.doEdit) === "function")) {
			this.cmp.doEdit ();
		}
		if (this.cmp.afterEdit && typeof (this.cmp.afterEdit) === "function") {
			this.cmp.afterEdit ();
		}

		return true;	// return true to allow row editor
	}

/*
	beforeDelete	:function (), overridden by instance, return false to cancel.
	afterDelete		:function (), overridden by instance.
*/
,	_doDelete	:function ()
	{
		if (this.cmp.beforeDelete && typeof (this.cmp.beforeDelete) === "function") {
			if (this.cmp.beforeDelete () === false) {
				return false;
			}
		}
		if (this.cmp.perm < 4) {
			return false;
		}

		if (this.cmp.selectedData.length <= 0) {
			return false;
		}

		Jx.msg.confirm (
			function ()
			{
				this.cmp.store.proxy.extraParams.action	= this.cmp.store.action = "destroy";

				if (this.cmp.doDelete && (typeof (this.cmp.doDelete) === "function")) {
					this.cmp.doDelete ();
				}

				if (this.cmp.afterDelete && typeof (this.cmp.afterDelete) === "function") {
					this.cmp.afterDelete ();
				}
			}
		,	this
		);
	}

/*
	beforeRefresh	:function, overridden by instance, return false to cancel.
	afterRefresh	:function, overridden by instance.
*/
,	_doRefresh		:function (perm)
	{
		if (this.cmp.beforeRefresh && typeof (this.cmp.beforeRefresh) === "function") {
			if (this.cmp.beforeRefresh () === false) {
				return;
			}
		}

		this.cmp.perm = perm;
		if (this.cmp.buttonAdd) {
			this.cmp.buttonAdd.setDisabled (perm < 2);
		}
		this.cmp.getSelectionModel ().deselectAll ();
		this.cmp.store.proxy.extraParams.action	= this.cmp.store.action = "read";
		this.cmp.store.load ();

		if (this.cmp.afterRefresh && typeof (this.cmp.afterRefresh) === "function") {
			this.cmp.afterRefresh ();
		}

		return false;
	}

/*
	beforeSelectionChange	:function, overridden by instance, return false to cancel.
	afterSelectionChange	:function, overridden by instance.
*/
,	_onSelectionChange		:function (model, data, e)
	{
		var s = (data.length <= 0);

		this.cmp.selectedData = data;

		if (this.cmp.buttonDelete) {
			this.cmp.buttonDelete.setDisabled (this.cmp.perm < 4);
		}
		if (this.cmp.buttonEdit) {
			this.cmp.buttonEdit.setDisabled (this.cmp.perm < 3);
		}
	}
});

Ext.preg ("crudbuttons", Jx.plugin.CrudButtons);
/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/

Ext.define ("Jx.plugin.SearchField", {
	extend			:"Ext.AbstractPlugin"
,	alias			:"jx.plugin.searchfield"
,	searchField		:undefined
,	lastSearchStr	:""

,	constructor	:function (config)
	{
		if (config) {
			Ext.apply(this, config);
		}
	}

,	init	:function (cmp)
	{
		/* Get or create top toolbar */
		var tbar	= undefined;
		var tbars	= cmp.getDockedItems ("toolbar[dock='top']");

		if (tbars.length > 0) {
			tbar = tbars[0];
		}

		if (undefined === tbar) {
			tbar = Ext.create ("Ext.toolbar.Toolbar", {
				dock		:"top"
			});
			cmp.addDocked (tbar);
		}

		this.searchField	= Ext.create ("Jx.SearchField", {
				itemId		:"searchfield"
			});

		tbar.add ("->");
		tbar.add (this.searchField);

		this.searchField.on ("specialkey", this.doSearch, this);
	}

/*
	beforeSearch	:function, overridden by instance, return false to cancel.
	afterSearch		:function, overridden by instance.
*/
,	doSearch	:function (f, e)
	{
		var v = f.getValue ();

		if (e.getKey ()	!= e.ENTER) {
			return;
		}

		if (this.cmp.beforeSearch
		&& typeof (this.cmp.beforeSearch) === "function") {
			if (this.cmp.beforeSearch (v) == false) {
				return;
			}
		}

		this.lastSearchStr						= v;
		this.cmp.store.proxy.extraParams.action	= this.cmp.store.action = "read";
		this.cmp.store.proxy.extraParams.query	= v;
		this.cmp.store.load ();

		if (this.cmp.afterSearch
		&& typeof (this.cmp.afterSearch) === "function") {
			this.cmp.afterSearch (v);
		}
	}
});
/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)

	Custom store with AJAX and JSON.
*/
var storeDefaultConfig = {
	autoLoad		:false
,	autoSync		:false
,	autoDestroy		:true
,	proxy			:
	{
		type			:"ajax"
	,	url				:""
	,	filterParam		:undefined
	,	reader			:
		{
			type			:"json"
		,	root			:"data"
		}
	,	writer			:
		{
			type			:"json"
		,	allowSingle		:false
		,	writeRecordId	:false
		}
	}

	// store's current action (read, create, update, destroy).
,	action		:"read"
,	singleApi	:true
,	extension	:_g_ext
,	idProperty	:"id"

,	api			:
	{
		read		:"read"
	,	create		:"create"
	,	update		:"update"
	,	destroy		:"destroy"
	}

,	storeInit :function ()
	{
		this.rebuildUrl ();

		/* Check and merge for extra parameters */
		if (this.extraParams && typeof (this.extraParams) === "object") {
			Ext.merge (this.proxy.extraParams, this.extraParams);
		}

		/* Set idProperty */
		this.model.prototype.idProperty = this.idProperty;
	}

,	rebuildUrl	:function ()
	{
		if (this.url) {
			if (this.singleApi) {
				this.proxy.api = {
						read	:this.url
					,	create	:this.url
					,	update	:this.url
					,	destroy	:this.url
					};
			} else {
				this.proxy.api = {
						read	:this.url + this.api.read		+ this.extension
					,	create	:this.url + this.api.create		+ this.extension
					,	update	:this.url + this.api.update 	+ this.extension
					,	destroy	:this.url + this.api.destroy	+ this.extension
					};
			}
		} else if (this.api) {
			this.proxy.api = this.api;
		}
	}

,	getIdProperty	:function ()
	{
		return this.model.prototype.idProperty;
	}
};

Ext.define ("Jx.Store", {
	extend	:"Ext.data.Store"
,	alias	:"jx.store"
,	config	:
	{
		remoteFilter	:true
	,	pageSize		:Jx.pageSize
	,	proxy			:
		{
			extraParams		:
			{
				action			:"read"
			,	query			:""
			,	subaction		:""
			}
		}
	}
,	constructor	:function (config)
	{
		var opts = {};

		Ext.merge (opts, storeDefaultConfig);
		Ext.merge (opts, this.config);
		Ext.merge (opts, config);

		this.callParent ([opts]);
		this.initConfig (opts)

		this.storeInit ();
	}
});

/**
 * Store with RESTful.
 */
Ext.define ("Jx.StoreRest", {
	extend		:"Jx.Store"
,	alias		:"jx.storerest"
,	config		:
	{
		proxy		:
		{
			type		:"rest"
		,	appendId	:false
		}
	}
,	constructor	:function (config)
	{
		var opts = Ext.merge ({}, this.config);

		Ext.merge (opts, config);

		this.callParent ([opts]);
	}
});

/*
	Custom store tree with REST + JSON.
*/
Ext.define ("Jx.StoreTree", {
	extend				:"Ext.data.TreeStore"
,	alias				:"jx.storetree"
,	config				:
	{
		defaultRootProperty	:"children"
	,	root				:
		{
			text				:""
		,	expanded			:true
		,	children			:[]
		}
	,	proxy				:
		{
			type				:"rest"
		,	appendId			:false
		,	reader			:
			{
				type			:"json"
			,	root			:"children"
			}
		}
	}

,	constructor	:function (config)
	{
		var opts = {};

		Ext.merge (opts, storeDefaultConfig);
		Ext.merge (opts, this.config);
		Ext.merge (opts, config);

		this.callParent ([opts]);
		this.initConfig (opts)

		this.storeInit ();
	}
});
/*
	Copyright 2013 x10c-lab.com
	Authors:
		- mhd.sulhan (sulhan@x10c-lab.com)

	Custom combobox with paging and searching.
*/
Ext.define ("Jx.ComboPaging", {
	extend			:"Ext.form.field.ComboBox"
,	alias			:"jx.combopaging"
,	forceSelection	:true
,	pageSize		:_g_paging_size
,	shrinkWrap		:3
,	typeAhead		:true
,	typeAheadDelay	:500
,	listConfig		:
	{
		loadingText		:"Loading ..."
	,	emptyText		:"Data not found."
	}

,	initComponent	:function ()
	{
		this.callParent (arguments);
	}
});
/*
	Copyright 2013 - x10c-lab.com
	Authors:
		- mhd.sulhan (sulhan@x10c-lab.com)
		- agus sugianto (agus@x10c-lab.com)

	Custom form panel with capabilities to use store to sync data.

	- createButtonBar
		+ true		:create buttom bar with addition button, save and cancel (default).
		+ false		:no buttom bar created.

	- syncUseStore
		+ true		:sync data using store.
		+ false		:sync data using form submit.
*/
Ext.define ("Jx.Form", {
	extend			:"Ext.form.Panel"
,	alias			:"jx.form"
,	config			:
	{
		autoScroll		:true
	,	jsonSubmit		:true
	,	bodyPadding		:10
	,	bodyStyle		:'border:0px;'
	,	border			:false
	,	defaultType		:"textfield"
	,	titleAlign		:"center"
	,	ui				:"default"
	,	defaults		:
		{
			anchor			:"100%"
		,	labelAlign		:"right"
		}
		/* custom configurations */
	,	createButtonBar	:true
	,	syncUseStore	:true
	}

,	constructor	:function (cfg)
	{
		this.callParent (arguments);

		var opts = Ext.merge ({}, this.config);
			opts = Ext.merge (opts, cfg);

		this.initConfig (opts);

		this.doCreateButtonBar (opts);
	}

,	doCreateButtonBar :function (cfg)
	{
		if (false === cfg.createButtonBar) {
			return;
		}

		this.buttonSave			= Ext.create ("Ext.button.Button", {
					text		:"Save"
			,       itemId		:"save"
			,       iconCls		:"form-save"
			,       formBind	:true
			,       tooltip		:"Save record"
			});

		this.buttonCancel		= Ext.create ("Ext.button.Button", {
						text	:"Cancel"
				,       itemId	:"cancel"
				,       iconCls	:"form-cancel"
				,       tooltip	:"Cancel record operation"
				});

		this.buttonSave.setHandler (this.doSave, this);
		this.buttonCancel.setHandler (this.doCancel, this);

		var barName		= "ButtonBar";
		var id			= (
							cfg.id
							? cfg.id + barName
							: (
								cfg.itemId
								? cfg.itemId + barName
								: "JxForm"+ barName
							)
						);

		this.buttonBar	= Ext.create ("Ext.toolbar.Toolbar", {
				id			:id
			,	dock		:"bottom"
			,	border		:true
			,	shadow		:true
			,	ui			:"footer"
			,	items		:
				[
					this.buttonCancel
				,	"-"
				,	"->"
				,	"-"
				,	this.buttonSave
				]
			});

		this.addDocked (this.buttonBar);
	}

,	doSave		:function ()
	{
		if (this.beforeFormSave
		&& typeof (this.beforeFormSave) === "function") {
			if (this.beforeFormSave () === false) {
				return;
			}
		}

		var f = this.getForm ();

		f.setValues (this.store.proxy.extraParams);

		if (!f.isValid ()) {
			Jx.msg.error ("Invalid form values!<br/>Please correct or fill form's field with red mark.");
			return;
		}

		/* If syncUseStore is true, use store.api to sync data */
		if (true === this.syncUseStore) {
			switch (this.store.action) {
			case "create":
				this.store.add (f.getValues ());
				break;
			case "update":
				f.updateRecord ();
				break;
			case "destroy":
				this.store.remove (f.getRecord ());
				break;
			default:
				Jx.msg.error (Jx.msg.ACTION_UNKNOWN +"'"+ this.store.action +"'");
				return;
			}

			this.store.proxy.extraParams.action = this.store.action;

			this.store.sync ({
				scope	:this
			,	success	:function (batch, action)
				{
					var data = this.store.proxy.reader.rawData.data;

					Jx.msg.info (data || Jx.msg.AJAX_SUCCESS);
					this.hide ();
					this.afterSaveSuccess ();
				}
			,	failure	:function (batch, action)
				{
					this.store.rejectChanges ();
					this.afterSaveFailure (action);
				}
			});

		} else { /* Otherwise use basic form submit */
			var url;
			var method = "GET";

			/* Generate url based on user action */
			switch (this.store.action) {
			case "read":
				url		= this.store.proxy.api.read;
				method	= "GET";
				break;
			case "create":
				url		= this.store.proxy.api.create;
				method	= "POST";
				break;
			case "update":
				url = this.store.proxy.api.update;

				if (this.store.singleApi) {
					method	= "PUT";
				} else {
					method	= "POST";
				}
				break;
			case "destroy":
				url = this.store.proxy.api.destroy;

				if (this.store.singleApi) {
					method	= "DELETE";
				} else {
					method	= "POST";
				}

				break;
			default:
				Jx.msg.error (Jx.msg.ACTION_UNKNOWN +"'"+ this.store.action +"'");
				return;
			}

			f.submit ({
				url		:url
			,	method	:method
			,	params	:
				{
					action		:this.store.action
				,	subaction	:this.store.proxy.extraParams.subaction
				}
			,	scope	:this
			,	success	:function (form, action)
				{
					Jx.msg.info (action.result.data);
					this.hide ();
					this.afterSaveSuccess ();
				}
			,	failure	:function (form, action)
				{
					this.store.rejectChanges ();
					this.afterSaveFailure (action);
				}
			,	clientValidation	:false
			});
		}
	}

,	afterSaveSuccess	:function ()
	{
		this.store.proxy.extraParams.action = this.store.action = "read";
		this.store.reload ({
				scope		:this
			,	callback	:function (r, op, success)
				{
					if (this.afterFormSave
					&& typeof (this.afterFormSave) === "function") {
						if (this.afterFormSave (success) === false) {
							return;
						}
					}
				}
			});
	}

,	afterSaveFailure	:function (action)
	{
		if (undefined !== action.failureType) {
			switch (action.failureType) {
			case Ext.form.action.Action.CLIENT_INVALID:
				Jx.msg.error (Jx.msg.CLIENT_INVALID);
				break;
			case Ext.form.action.Action.CONNECT_FAILURE:
				Jx.msg.error (Jx.msg.AJAX_FAILURE);
				break;
			case Ext.form.action.Action.SERVER_INVALID:
				if (action.result) {
					Jx.msg.error (action.result.data);
				} else {
					Jx.msg.error (this.store.proxy.reader.rawData.data);
				}
				break;
			default:
				Jx.msg.error (Jx.msg.SERVER_ERROR);
				break;
			}
		} else {
			if (action.result) {
				Jx.msg.error (action.result.data);
			} else {
				Jx.msg.error (this.store.proxy.reader.rawData.data);
			}
		}

		if (this.afterFormSave
		&& typeof (this.afterFormSave) === "function") {
			if (this.afterFormSave (false) === false) {
				return;
			}
		}
	}

,	doCancel	:function ()
	{
		if (this.beforeFormCancel
		&& typeof (this.beforeFormCancel) === "function") {
			if (this.beforeFormCancel () === false) {
				return;
			}
		}

		this.hide ();

		if (this.afterFormCancel
		&& typeof (this.afterFormCancel) === "function") {
			this.afterFormCancel ();
		}
	}
});
Ext.define ("Jx.SearchField", {
	extend			:"Ext.form.field.Trigger"
,	alias			:"widget.jx.searchfield"
,	emptyText		:"Search ..."
,	tooltip			:"Type any string and enter to filter data"
,	initComponent	: function ()
	{
		var me = this;

		me.triggerCls = "x-form-clear-trigger"; // native ExtJS class & icon

		me.callParent (arguments);
	}

,	onTriggerClick: function ()
	{
		this.setRawValue('');
	}
});
/*
	Copyright 2014 - Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)

	Custom grid panel with,
	- CRUD buttons (add, edit, refresh, delete)
	- search
	- paging
*/
Ext.define ("Jx.GridPaging", {
	extend			:"Ext.grid.Panel"
,	alias			:"widget.jx.gridpaging"
,	layout			:"fit"
,	titleAlign		:"center"
,	enableLocking	:true
,	viewConfig		:
	{
		enableTextSelection	:true
	}

,	config			:
	{
		perm					:0
		// crud buttons.
	,	plugCrudButtons			:undefined
	,	plugCrudButtonsConfig	:{}
	,	showCrudButtons			:true
		// search bar
	,	plugSearchField			:undefined
	,	plugSearchFieldConfig	:{}
	,	showSearchField			:true

	,	pagingBar				:undefined
	,	selectedData			:[]
		// list of data details, for master-detail grid.
	,	compDetails				:[]
	,	buttons					:[]
	}

,	constructor		:function (config)
	{
		var	opts = Ext.merge ({}, this.config);
			opts = Ext.merge (opts, config);

		this.callParent (arguments);
		this.initConfig (opts);

		this.createPagingBar ();

		// Inject CRUD buttons to panel.
		if (opts.showCrudButtons) {
			this.plugCrudButtons	= Ext.create ("Jx.plugin.CrudButtons"
									, opts.plugCrudButtonsConfig
									);
			this.addPlugin (this.plugCrudButtons);
		}

		// Inject search field.
		if (opts.showSearchField) {
			this.plugSearchField	= Ext.create ("Jx.plugin.SearchField"
									, opts.plugSearchFieldConfig
									);

			this.addPlugin (this.plugSearchField);
		}

		// Register events.
		this.addEvents ("refresh");

		this.on ("selectionchange", this._onSelectionChange, this);
	}

	/*
		Add paging toolbar to the bottom of grid panel.
	*/
,	createPagingBar	:function ()
	{
		var barName		= "PagingBar";
		var id			= (this.id
								? this.id + barName
								: (this.itemId
									? this.itemId + barName
									: "JxGridPaging" + barName
								)
						);

		this.pagingBar	= Ext.create ("Ext.toolbar.Paging", {
				id			:id
			,	store		:this.store
			,	displayInfo	:true
			,	dock		:"bottom"
			,	pageSize	:_g_paging_size
			,	plugins		:new Ext.ux.ProgressBarPager()
			});

		this.addDocked (this.pagingBar);
	}

,	clearData	:function ()
	{
		this.store.loadData ([], false);
	}

/*
	beforeSelectionChange	:function, overridden by instance, return false to cancel.
	afterSelectionChange	:function, overridden by instance.
*/
,	_onSelectionChange		:function (model, data, e)
	{
		var s	= (data.length <= 0);
		var id	= 0;

		if (this.beforeSelectionChange && typeof (this.beforeSelectionChange) === "function") {
			if (this.beforeSelectionChange (model, data, e) === false) {
				return false;
			}
		}

		this.selectedData = data;

		/* Refresh grid details */
		if (data.length > 0) {
			id	= data[0].get (this.getStore ().getIdProperty ());

			if (this.onSelectionChange
			&& typeof (this.onSelectionChange) === "function") {
				this.onSelectionChange (model, data, e);
			}

			if (this.afterSelectionChange
			&& typeof (this.afterSelectionChange) === "function") {
				this.afterSelectionChange (model, data, e);
			}
		}
	}

,	doRefresh	:function (perm)
	{
		this.fireEvent ("refresh", perm);
	}

/*
	beforeFormSave	:function, overridden by instance, return false to cancel.
	afterFormSave	:function, overridden by instance.
*/

/*
	beforeFormCancel	:function, overridden by instance, return false to cancel.
	afterFormCancel		:function, overridden by instance.
*/
});
/*
	Copyright 2013 - x10c-lab.com
	Authors:
		- mhd.sulhan (sulhan@x10c-lab.com)

	Custom grid panel with paging and row editor.
*/
Ext.define ("Jx.GridPaging.RowEditor", {
	extend			:"Jx.GridPaging"
,	alias			:"jx.gridpaging.roweditor"
,	config			:
	{
		rowEditor		:undefined
	}

,	constructor		: function (config)
	{
		this.callParent (arguments);
		this.initConfig (config);

		this.createRowEditor (config);
	}

,	createRowEditor	:function (cfg)
	{
		var barName		= "RowEditor";
		var id			= (
							cfg.id
							? cfg.id + barName
							: (
								cfg.itemId
								? cfg.itemId + barName
								: "JxForm"+ barName
							)
						);

		this.rowEditor			= Ext.create ("Ext.grid.plugin.RowEditing", {
				pluginId		:id
			,	clicksToEdit	:2
			,	autoCancel		:false
			});

		/* Add listener for grid row editor */
		this.rowEditor.on ("beforeedit"	, this.onBeforeEdit	, this);
		this.rowEditor.on ("edit"		, this.doRowSave	, this);
		this.rowEditor.on ("canceledit"	, this.doRowCancel	, this);

		this.rowEditor.init (this);
	}

,	onBeforeEdit : function ()
	{
		if (this.store.action == "create") {
			return true;
		}

		this.store.proxy.extraParams.action	= this.store.action = "update";

		// check user selection
		this.getSelectedData ();
		if (this.selectedData.length <= 0) {
			return false;
		}

		return true;
	}

/*
	beforeAdd	:function, overridden by instance, return false to cancel.
	afterAdd	:function, overridden by instance.
*/
,	doAdd		:function ()
	{
		this.rowEditor.cancelEdit ();

		var r = this.store.model.create ();

		this.store.insert (0, r);
		this.rowEditor.startEdit (0, 0);
	}

,	doEdit		:function ()
	{
		this.rowEditor.cancelEdit ();
		this.rowEditor.startEdit (this.store.indexOf (this.selectedData[0]), 0);
	}

,	doDelete	:function ()
	{
		this.store.remove (this.selectedData);
		this.store.sync ();
	}

/*
	beforeRowSave	:function, overridden by instance, return false to cancel.
	afterRowSave	:function, overridden by instance.
*/
,	doRowSave	:function ()
	{
		if (this.beforeRowSave && typeof (this.beforeRowSave) === "function") {
			if (this.beforeRowSave () == false) {
				return false;
			}
		}

		this.store.proxy.extraParams.action = this.store.action;

		this.store.sync ({
				params		:this.store.proxy.extraParams
			,	scope		:this
			,	success		:function (batch, op)
				{
					Jx.msg.info (Jx.msg.AJAX_SUCCESS);

					this.store.proxy.extraParams.action = this.store.action = "read";

					// reload store to retrieve ID of data (for table that depend on ID)
					this.store.reload ();

					if (this.afterRowSave && typeof (this.afterRowSave) === "function") {
						this.afterRowSave ();
					}
				}
			,	failure		:function (batch, op)
				{
					Jx.msg.error (Jx.msg.AJAX_FAILURE);
				}
			});
	}

/*
	beforeRowCancel	:function, overridden by instance, return false to cancel.
	afterRowCancel	:function, overridden by instance.
*/
,	doRowCancel	:function ()
	{
		if (this.beforeRowCancel && typeof (this.beforeRowCancel) === "function") {
			if (this.beforeRowCancel () == false) {
				return false;
			}
		}

		if ("create" == this.store.action) {
			this.store.removeAt (0);
			if (this.store.count () > 0) {
				this.getSelectionModel ().select (0);
			}
		}

		if (this.afterRowCancel && typeof (this.afterRowCancel) === "function") {
			this.afterRowCancel ();
		}
	}
});
/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)

	Custom grid panel with paging and row editor.
*/
Ext.define ("Jx.GridPaging.FormEditor", {
	extend		:"Ext.panel.Panel"
,	alias		:"jx.gridpaging.formeditor"
,	config		:
	{
		panelConfig	:
		{
			layout		:"border"
		,	titleAlign	:"center"
		}
	,	grid		:undefined
	,	gridConfig	:
		{
			region		:"center"
		,	doAdd		:function ()
			{
				this.ownerCt.form.setTitle ("Create new data");
				this.ownerCt.form.getForm ().reset ();
				this.ownerCt.form.show ();
			}
		,	doEdit		:function ()
			{
				this.ownerCt.form.setTitle ("Updating data");
				this.ownerCt.form.getForm ().reset ();
				this.ownerCt.form.loadRecord (this.selectedData[0]);
				this.ownerCt.form.show ();
			}
		,	doDelete	:function ()
			{
				this.ownerCt.form.getForm ().reset ();
				this.ownerCt.form.loadRecord (this.selectedData[0]);
				this.ownerCt.form.doSave ();
			}
		,	onSelectionChange	:function (model, data, e)
			{
				if (data.length > 0) {
					this.ownerCt.form.loadRecord (data[0]);
				}
			}
		,	onItemDoubleClick	:function (view, record, itemEl, index, e)
			{
				this.ownerCt.grid._doEdit ();
			}
		}

	,	form			:undefined
	,	formConfig		:
		{
			region			:"east"		// position of form in grid.
		,	syncUseStore	:true
		,	hidden			:true
		,	split			:true
		}
	}

,	constructor	:function (cfg)
	{
		var opts = Ext.merge ({}, this.panelConfig);
			opts = Ext.merge (opts, cfg.panelConfig);

		this.callParent ([opts]);
		this.initConfig (opts);

		this.createGrid (cfg);
		this.createForm (cfg);
	}

,	createGrid	:function (cfg)
	{
		var barName		= "Grid";
		var id			= ( cfg.id ? cfg.id + barName : ( cfg.itemId ? cfg.itemId + barName : "JxGridPagingFormEditor"+ barName));

		/* Add row number to grid */
		cfg.columns.splice (0, 0, { xtype : "rownumberer" });

		var opts	= Ext.merge ({
						itemId	: id
					,	_parent	: this
					}, this.gridConfig);
			opts = Ext.merge (opts, cfg);

		this.grid = Ext.create ("Jx.GridPaging", opts);

		this.grid.on ("itemdblclick", this.grid.onItemDoubleClick, this.grid);

		this.add (this.grid);
	}

,	createForm	:function (cfg)
	{
		var barName		= "Form";
		var id			= ( cfg.id ? cfg.id + barName : ( cfg.itemId ? cfg.itemId + barName : "JxGridPagingFormEditor"+ barName));

		var opts	= Ext.merge ({
							store	:cfg.store
						,	itemId	:id
					}
					, this.formConfig);

			opts	= Ext.merge (opts, cfg.formConfig);

		this.form	= Ext.create ("Jx.Form", opts);

		/* Add each column's editor to form */
		for (var i = 0, c = null; i < cfg.columns.length; i++) {
			c = cfg.columns[i];

			if (undefined != c.columns) {
				var fs	= Ext.create ("Ext.form.FieldSet", {
						title			:c.header
					,	layout			:"anchor"
					,	defaultType		:"textfield"
					,	flex			:1
					,	fieldDefaults	:
						{
							anchor			:"100%"
						,	msgTarget		:"side"
						}
					});

				for (var k = 0, cc = null; k < c.columns.length; k++) {
					cc = c.columns[k];

					if (undefined != cc.editor) {
						if (undefined == cc.editor.fieldLabel) {
							cc.editor.fieldLabel = cc.header || cc.text;
						}
						cc.editor.name = cc.dataIndex;

						fs.add (cc.editor);
					}
				}

				this.form.add (fs);
			} else if (undefined != c.editor) {
				if (undefined == c.editor.fieldLabel) {
					c.editor.fieldLabel	= c.header || c.text;
				}
				c.editor.name		= c.dataIndex;

				this.form.add (c.editor);
			}
		}

		this.add (this.form);
	}

,	doRefresh : function (perm)
	{
		this.grid.doRefresh (perm);
	}

,	clearData	:function ()
	{
		this.grid.store.loadData ([], false);
	}
});