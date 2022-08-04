sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	"sap/ui/core/EventBus",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, UIComponent, JSONModel, Filter, EventBus, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Main", {

		onInit: function() {
			//UIComponent.prototype.init.apply(this, arguments);
			//this.getRouter().initialize();
			this._onInitilization();
			this._onReadYearSet();
		},

		// initial yearSet
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

		// section 80C
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

		// section 80
		_onRead80DataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, "1000");
			var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/Tax80";

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

		// House rent allowance
		_onReadHRADataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPersonlNoFilter = new sap.ui.model.Filter("personnelNo", sap.ui.model.FilterOperator.EQ, "1000");
			var oFiscalYearFilter = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/TaxHouseRentAllowance";

			oModel.read(oUrl, {
				filters: [oPersonlNoFilter, oFiscalYearFilter],
				success: function(response) {
					var data = response.results;
					console.log(data);
					var oJsonHRAModel = that.getOwnerComponent().getModel("HRA");
					oJsonHRAModel.setData(data);

				},
				error: function(error) {

				}
			});

		},
		_onReadPreviousEmployementDataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPersonlNoFilter = new sap.ui.model.Filter("personnelNo", sap.ui.model.FilterOperator.EQ, "1000");
			var oFiscalYearFilter = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/TaxPreviousEmployment";

			oModel.read(oUrl, {
				filters: [oPersonlNoFilter, oFiscalYearFilter],
				success: function(response) {
					var data = response.results;
					//console.log(data.length);
/*					if (data.length && data.length === 0) {
						data.push({
							"LTACarriedForward": "",
							"LTAExemptionsAvailed": "",
							"currency": "INR",
							"educationCessDeducted": " ",
							"employeeNPSBasis": "",
							"employeeNPSContribution": "",
							"employeeProvidentFund": "",
							"employerNPSBasis": "",
							"employerNPSContribution": "",
							"endDate": "",
							"exemptionUnderSection10": "",
							"fiscalYear": "",
							"gratuityExemptionAmount": "",
							"grossSalaryPreviousEmployment": "",
							"incomeTaxDeducted": "",
							"incomeTaxDeductedIncludeCessSurcharge": "",
							"leaveEncashmentExemptionAmount": "",
							"medicalExemptionAvailed": "",
							"personnelNo": "",
							"prerquisiteAmountUnderSection17": "",
							"professionalTaxPaid": "",
							"profitInLieuSalaryUnderSection17": "",
							"retrenchmentExemptionAmount": "",
							"sequenceNo": "",
							"startDate": "",
							"surchargeDeducted": "",
							"voluntaryRetirementSchemeAmount": ""
						});
					}*/
					var oJsonPreviousEmployementModel = that.getOwnerComponent().getModel("PreviousEmployement");
					oJsonPreviousEmployementModel.setData(data);

				},
				error: function(error) {

	/*				var data = [];
                    var dummyData = {
							"LTACarriedForward": "",
							"LTAExemptionsAvailed": "",
							"currency": "INR",
							"educationCessDeducted": " ",
							"employeeNPSBasis": "",
							"employeeNPSContribution": "",
							"employeeProvidentFund": "",
							"employerNPSBasis": "",
							"employerNPSContribution": "",
							"endDate": "",
							"exemptionUnderSection10": "",
							"fiscalYear": "",
							"gratuityExemptionAmount": "",
							"grossSalaryPreviousEmployment": "",
							"incomeTaxDeducted": "",
							"incomeTaxDeductedIncludeCessSurcharge": "",
							"leaveEncashmentExemptionAmount": "",
							"medicalExemptionAvailed": "",
							"personnelNo": "",
							"prerquisiteAmountUnderSection17": "",
							"professionalTaxPaid": "",
							"profitInLieuSalaryUnderSection17": "",
							"retrenchmentExemptionAmount": "",
							"sequenceNo": "",
							"startDate": "",
							"surchargeDeducted": "",
							"voluntaryRetirementSchemeAmount": ""
						};
					if (data.length && data.length === 0) {
						data.push(dummyData);
					}
					var oJsonPreviousEmployementModel = that.getOwnerComponent().getModel("PreviousEmployement");
					oJsonPreviousEmployementModel.setData(data);*/

				}
			});

		},
		_onReadHousePropertyDataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPersonlNoFilter = new sap.ui.model.Filter("personnelNo", sap.ui.model.FilterOperator.EQ, "1000");
			var oFiscalYearFilter = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/TaxHouseProperty";

			oModel.read(oUrl, {
				filters: [oPersonlNoFilter, oFiscalYearFilter],
				success: function(response) {
					var data = response.results;
					console.log(data);
					var oJsonHousePropertyModel = that.getOwnerComponent().getModel("HouseProperty");
					oJsonHousePropertyModel.setData(data);

				},
				error: function(error) {

				}
			});

		},
		_onReadOtherSourcesDataSet: function() {
			var that = this;
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var oModel = this.getOwnerComponent().getModel();
			var oPersonlNoFilter = new sap.ui.model.Filter("personnelNo", sap.ui.model.FilterOperator.EQ, "1000");
			var oFiscalYearFilter = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, oJsonGlobalData.selectedYear.yearText);
			var oUrl = "/TaxOtherSources";

			oModel.read(oUrl, {
				filters: [oPersonlNoFilter, oFiscalYearFilter],
				success: function(response) {
					var data = response.results;
					console.log(data);
					var oJsonOtherSourcesModel = that.getOwnerComponent().getModel("OtherSources");
					oJsonOtherSourcesModel.setData(data);

				},
				error: function(error) {

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
				this._onRead80DataSet();
				this.getOwnerComponent().getTargets().display("Sec80");
			} else if (oHeaderText === "HouseRent") {
				this._onReadHRADataSet();
				this.getOwnerComponent().getTargets().display("HouseRent");
			} else if (oHeaderText === "PreviousEmployement") {
				this._onReadPreviousEmployementDataSet();
				this.getOwnerComponent().getTargets().display("PreviousEmployement");
			} else if (oHeaderText === "HouseProperty") {
				this._onReadHousePropertyDataSet();
				this.getOwnerComponent().getTargets().display("HouseProperty");
			} else if (oHeaderText === "OtherSources") {
				this._onReadOtherSourcesDataSet();
				this.getOwnerComponent().getTargets().display("OtherSources");
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