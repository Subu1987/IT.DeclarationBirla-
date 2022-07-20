sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, Filter, MessageBox) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Sec80c", {

		onInit: function() {
			this.totalDeclaredAmount = 0;
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("Sec80c").attachPatternMatched(this._onRead80CDataSet, this);
			//this.getRouter().getRoute("Sec80c").attachPatternMatched(this._onRead80CDataSet, this);
		},
		onChange: function(oEvent) {
			var oData = this.getOwnerComponent().getModel('sec80c').getData();
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			oJsonGlobalData.oTotal80CDeclaredAmount = 0;
			for (var i = 0; i < oData.length; i++) {
				oJsonGlobalData.oTotal80CDeclaredAmount += Number(oData[i].Amount);
			}
			this.getOwnerComponent().getModel("globalData").setData(oJsonGlobalData);
			//this.totalDeclaredAmount += Number(oEvent.getSource().getValue());
		},

		onSave: function() {
			var dataArray = this.getOwnerComponent().getModel('sec80c').getData();
			for (var i = 0; i < dataArray.length; i++) {
				delete dataArray[i].__metadata;
			}

			var odata = {
				"EmpNo": dataArray[0].EmpNo,
				"ToEmp": dataArray
			};
			this._onSave80CDataSet(odata);
		},

		_onSave80CDataSet: function(oData) {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var oUrl = "/EmpDummySet";
			//var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, '1000');
			//var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, '2022-2023');
			oModel.create(oUrl, oData, {
					success: function(response) {
						MessageBox.information("The 80c data is saved");
					},
					error: function(error) {
						MessageBox.information("The 80c data is not saved");
					}
				}

			);
		},

		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		}

	});
});