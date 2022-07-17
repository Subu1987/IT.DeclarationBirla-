sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter'
], function(Controller, JSONModel, Filter) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Sec80", {

		onInit: function() {
			this._onRead80DataSet();
		},
		_onRead80DataSet: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, '1000');
			var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, '2020-2021');
			var oUrl = "/TAX_80Set";

			oModel.read(oUrl, {
				filters: [oPernerFilter, oFiscalYearFilter],
				success: function(response) {
					var data = response.results;
					var oJsonSec80Model = that.getOwnerComponent().getModel('sec80');
					oJsonSec80Model.setData(data);
				},
				error: function(error) {
					console.log(error);
				}
			});
		},

		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		}

	});
});