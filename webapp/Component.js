sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"IT/DeclarationBirla/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("IT.DeclarationBirla.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// display the page1 
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
	        this.getTargets().display("Main");
		}
	});
});