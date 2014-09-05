/*
	Copyright 2014 Mhd Sulhan
	Authors:
		- mhd.sulhan (m.shulhan@gmail.com)
*/
var main;

function JxMain ()
{
	this.id					= "main";
	this.menuStoreId		= this.id +"MenuStore";
	this.contentHomeId		= this.id +"_home";
	this.contentDashboardId	= this.id +"_dashboard";
	this.headerId			= this.id +"_header";
	this.footerId			= this.id +"_footer";
	this.dir				= _g_module_dir + this.id;

	this.store	= Ext.create ("Jx.Store", {
			storeId	:this.menuStoreId
		,	url		:_g_module_path +"menu"+ _g_ext
		,	fields	:
			[
				"title"
			,	"tbar"
			]
		});

	this.header				= new JxMainHeader (this, this.headerId);
	this.contentHome		= new JxMainHome (this, this.contentHomeId);
	this.contentDashboard	= new JxMainDashboard (this, this.contentDashboardId);
	this.footer				= new JxMainFooter (this, this.footerId);
	this.container			= Ext.create ("Ext.container.Container", {
			region	:"center"
		,	margin	:"5 0 0 0"
		,	padding	:"0 5 0 5"
		,	plain	:true
		,	layout	:"fit"
		,	bodyCls	:"panel-background"
		,	items	:
			[
				this.contentHome.panel
			,	this.contentDashboard.panel
			]
		});

	// Main interface
	this.main			= Ext.create ("Ext.container.Viewport", {
			layout		:"border"
		,	renderTo	:Ext.getBody ()
		,	items		:
			[
				this.header.panel
			,	this.container
			,	this.footer.panel
			]
		});

	this.onTabChange	= function (tabp, newc, oldc, e)
	{
		if (newc.id === this.contentHomeId) {
			this.content.hide ();
			this.contentHome.show ();
			this.contentDashboard.hide ();
		} else if (newc.id === this.contentDashboardId) {
			this.content.hide ();
			this.contentHome.hide ();
			this.contentDashboard.show ();
		} else {
			this.content.show ();
			this.contentHome.hide ();
			this.contentDashboard.hide ();
		}
	};

//{{{ event handler: on menu click
	this.onMenuClick = function (b, force)
	{
		var tab, tbar;

		Jx.showMask ();

		if (b.id === this.contentHomeId) {
			this.content.hide ();
			this.contentDashboard.hide ();
			this.contentHome.show ();
			Jx.hideMask ();
			return;
		} else if (b.id === this.contentDashboardId) {
			this.content.hide ();
			this.contentHome.hide ();
			this.contentDashboard.show ();
			Jx.hideMask ();
			return;
		}

		this.content.show ();
		this.contentHome.hide ();
		this.contentDashboard.hide ();

		switch (_g_menu_mode) {
		case 0:
			tab		= main.menu.getActiveTab ();
			tbar	= tab.dockedItems.getAt (0);

			// Remove toggle from menu button
			for (var i = 0; i < main.menu.items.length; i++) {
				tab = main.menu.items.getAt (i);
				tbar = tab.getDockedItems ('toolbar[dock="top"]');

				for (var j = 0; j < tbar.length; j++) {
					for (var k = 0; k < tbar[j].items.items.length; k++) {
						tbar[j].items.items[k].toggle (false, true);
					}
				}
			}

			if (b.toggle !== undefined) {
				b.toggle (true, true);
			}
			break;

		case 1:
			tbar	= main.menuBar;
			break;
		}

		// Find menu module in content area.
		switch (_g_content_type) {
		case 0:
			// do nothing
			break;
		case 1:
			var c = main.content.getComponent (b.module);

			if (c !== undefined) {
				main.content.setActiveTab (c);
				Jx.hideMask ();
				return;
			}
			break;
		}

		var script_url = _g_module_dir + b.module.replace (/_/g, "/") +"/layout.js";

		Ext.Loader.loadScript ({
				url		: script_url
			,	onLoad	: function ()
				{
					var module = eval (b.module);

					switch (_g_content_type) {
					case 0:
						main.content.removeAll (true);
						if (undefined !== module.panel) {
							main.content.add (module.panel);
						} else {
							main.content.add (module);
						}
						break;
					case 1:
						if (undefined !== module.panel) {
							main.content.add (module.panel);
							main.content.setActiveTab (module.panel);
						} else {
							main.content.add (module);
							main.content.setActiveTab (module);
						}
						main.content.doLayout ();
						break;
					}

					module.doRefresh (b.permission);
					Jx.hideMask ();
				}
			,	onError	: function ()
				{
					Jx.msg.error ("Fail to load module!");
					Jx.hideMask ();
				}
			});
	};
//}}}

	this.loadMenu	= function ()
	{
		this.store.load ({
			scope		:this
		,	callback	:function (r, op, success)
			{
				if (! success) {
					Jx.msg.error ("Failed to load application menu! <br/>");
					return;
				}

				// Add tab with toolbar to menu
				for (var i = 0; i < r.length; i++) {
					var tab, tbar;

					switch (_g_menu_mode) {
					case 0:
						tab			= this.menu.add (r[i].raw);
						tbar		= tab.dockedItems.getAt (0);
						break;
					case 1:
						tbar	= this.menuBar;
						tbar.add (r[i].raw);
						break;
					}

					// Inject "click" event to each button menu
					for (var m = 0; tbar !== undefined && m < tbar.items.items.length; m++) {
						var b = tbar.items.items[m];

						if (undefined === b.menu) {
							b.setHandler (this.onMenuClick, this);
						} else {
							var submenu = b.menu.items.items;

							for (var sm = 0; sm < submenu.length; sm++) {
								submenu [sm].setHandler (this.onMenuClick, this);
							}
						}
					}
				}

				switch (_g_menu_mode) {
				case 0:
					this.menu.setActiveTab (0);
					break;
				case 1:
					break;
				}
			}
		});
	};

	this.showLoading = function ()
	{
		Ext.get ('loading').show ();
		Ext.get ('loading-mask').fadeIn ({
			remove		:false
		,	useDisplay	:true
		});
	};

	this.hideLoading = function ()
	{
		setTimeout (function ()
		{
			Ext.get ('loading').hide ();
			Ext.get ('loading-mask').fadeOut({
				remove		:false
			,	useDisplay	:true
			});
		}
		, 100);
	};

	this.init = function ()
	{
		switch (_g_menu_mode) {
		case 0:
			this.menu			= Ext.create ("Ext.tab.Panel", {
					region		:"north"
				,	padding		:"5 5 0 5"
				,	activeTab	:0
				,	plain		:true
				,	centered	:true
				,	tabBar		:
					{
						plain		:true
					,	layout		:
						{
							pack		:"left"
						}
					}
				,	items		:[]
				});

			this.menu.on ("tabchange", this.onTabChange, this);
			break;

		case 1:
			this.menuBar		= Ext.create ("Ext.toolbar.Toolbar", {
					dock		:"top"
				,	layout		:
					{
						overflowHandler	:"Menu"
					}
				,	items		:[]
				});

			this.menu			= Ext.create ("Ext.panel.Panel", {
					region		:"north"
				,	height		:40
				,	dockedItems	:
					[
						this.menuBar
					]
				});
			break;
		}

		switch (_g_content_type) {
		case 0:
			this.content		= Ext.create ("Ext.panel.Panel", {
					hidden		:true
				,	layout		:"fit"
				});
			break;
		case 1:
			this.content		= Ext.create ("Ext.tab.Panel", {
					hidden		:true
				,	items		:[]
				});
			break;
		}

		this.main.add (this.menu);
		this.container.add (this.content);

		this.loadMenu ();
		this.contentHome.init ();
		this.hideLoading ();
	};
}

Ext.onReady (function ()
{
	main = new JxMain ();

	main.init ();
});
