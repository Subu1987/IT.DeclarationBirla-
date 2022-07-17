sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter'
], function(Controller, JSONModel, Filter) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Main", {

		onInit: function() {

			// create a model for sec80c
			/*	        var oModel2 = new JSONModel("model/sec80c.json");
				        
				        this.getView().setModel(oModel2,"model2");
				        console.log(oModel2);
				        
				        var oModel3 = new JSONModel("model/otherChapter.json");
				        
				        this.getView().setModel(oModel3,"model3");
				        
				        console.log(oModel3);*/

			this._onReadYearSet();

		},
		_onReadYearSet: function() {
			var oModel = this.getOwnerComponent().getModel();
			var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, '1000');
			var oUrl = "/YEARSet";

			oModel.read(oUrl, {
				filters: [oPernerFilter],
				success: function(response) {
					console.log(response);
				},
				error: function(error) {
					console.log(error);
				}
			});
		},

		// onPress button
		onPress: function(oEvent) {

			// retrive the button id
			//var oHeaderText = oEvent.getSource().getHeader();
			var oHeaderText = oEvent.getSource().getCustomData()[0].mBindingInfos.value.parts[0].path;

			if (oHeaderText === "sec80c") {
				this.getOwnerComponent().getTargets().display("Sec80c");

			} else if (oHeaderText === "sec80") {
				this.getOwnerComponent().getTargets().display("Sec80");
			}

			// retrive the button txt
			/*var oText = oEvent.getSource().getText();
		   console.log(oText);*/

		},
		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		}

	});
});