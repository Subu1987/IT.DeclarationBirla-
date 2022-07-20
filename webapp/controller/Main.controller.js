sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	"sap/ui/core/EventBus",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, UIComponent, JSONModel, Filter, EventBus, MessageBox,MessageToast) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Main", {

		onInit: function() {
			//UIComponent.prototype.init.apply(this, arguments);
			//this.getRouter().initialize();
			this._onInitilization();
			this._onReadYearSet();
		},
		_onReadYearSet: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, "1000");
			var oUrl = "/YEARSet";

			oModel.read(oUrl, {
				filters: [oPernerFilter],
				success: function(response) {
					var data = response.results;
					var oJsonYearSetModel = that.getOwnerComponent().getModel("yearSet");
					oJsonYearSetModel.setData(data);
					that.onDefaultYearSelect(data);
				},
				error: function(error) {}
			});
		},
		_onRead80CDataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPernerFilter = new sap.ui.model.Filter("EmpNo", sap.ui.model.FilterOperator.EQ, '1000');
			var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/TAX_80CSet";

			oModel.read(oUrl, {
				filters: [oPernerFilter, oFiscalYearFilter],
				success: function(response) {
					oJsonGlobalData.oTotal80CDeclaredAmount = 0;
					var data = response.results;
					var oJsonSec80cModel = that.getOwnerComponent().getModel('sec80c');
					oJsonSec80cModel.setData(data);
					for (var i = 0; i < data.length; i++) {
						oJsonGlobalData.oTotal80CDeclaredAmount += Number(data[i].Amount);
					}
					that.getOwnerComponent().getModel("globalData").setData(oJsonGlobalData);
				},
				error: function(error) {
					//console.log(error);
					MessageToast.show("Error in loading the Financial Years");
				}
			});
		},
		_onRead80DataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, '1000');
			var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/TAX_80Set";

			oModel.read(oUrl, {
				filters: [oPernerFilter, oFiscalYearFilter],
				success: function(response) {
					var data = response.results;
					var oJsonSec80Model = that.getOwnerComponent().getModel("sec80");
					oJsonSec80Model.setData(data);
					
				},
				error: function(error) {
					//console.log(error);
					MessageToast.show("Error in loading the 80C data");
				}
			});
		},
		// onPress button
		onPress: function(oEvent, oData) {
			var oSelectedYear = this.getOwnerComponent().getModel("globalData").getData().selectedYear;
			if (oSelectedYear === undefined) {
				MessageBox.information("Please Selected a Financial Year");
				return;
			}
			var oHeaderText = oEvent.getSource().getCustomData()[0].mBindingInfos.value.parts[0].path;
			if (oHeaderText === "sec80c") {
				this._onRead80CDataSet();
				this.getOwnerComponent().getTargets().display("Sec80c");
			} else if (oHeaderText === "sec80") {
				this.getOwnerComponent().getTargets().display("Sec80");
			}
		},
		_onInitilization: function() {
			var data = {
				selectedYear: {
					yearKey: 0,
					yearText: 0
				}

			};
			var oJsonGlobalModel = this.getOwnerComponent().getModel("globalData");
			oJsonGlobalModel.setData(data);
		},
		onDefaultYearSelect: function(oData) {
			var oJsonGlobalModel = this.getOwnerComponent().getModel("globalData");
			var oJsonGlobalData = oJsonGlobalModel.getData();
			var oSelectedYear = oJsonGlobalData.selectedYear;
			oSelectedYear.yearKey = oData[0].SlNo;
			oSelectedYear.yearText = oData[0].Fiscal;
			oJsonGlobalModel.setData(oJsonGlobalData);
		},
		onChange: function(oEvent) {
			var selKey = oEvent.getParameter("selectedItem").getKey();
			var selText = oEvent.getParameter("selectedItem").getText();
			var oJsonGlobalModel = this.getOwnerComponent().getModel("globalData");
			var oJsonGlobalData = oJsonGlobalModel.getData();
			var oSelectedYear = oJsonGlobalData.selectedYear;
			oSelectedYear.yearKey = selKey;
			oSelectedYear.yearText = selText;
			oJsonGlobalModel.setData(oJsonGlobalData);
		},
		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		},
		onExit: function() {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
		}

	});
});