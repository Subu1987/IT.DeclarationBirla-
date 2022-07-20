sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter'
], function(Controller, JSONModel, Filter) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Sec80", {

		onInit: function() {
		
		},

		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		}

	});
});