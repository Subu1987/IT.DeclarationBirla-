sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, Filter, MessageBox) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.OtherSources", {

		onInit: function() {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("OtherSources").attachPatternMatched(this._onReadOtherSourcesDataSet, this);
			
		},

		onSave: function() {
			var dataArray = this.getOwnerComponent().getModel("OtherSources").getData();
			for (var i = 0; i < dataArray.length; i++) {
				delete dataArray[i].__metadata;
			}
            this._onSaveHousePropertyDataSet(dataArray);
/*			var odata = {
				"EmpNo": dataArray[0].EmpNo,
				"ToEmp": dataArray
			};
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			
			
			if(oJsonGlobalData.oTotal80CDeclaredAmount === 0){
			    MessageBox.information("Input Amount can't be zero");
			}else if(oJsonGlobalData.oTotal80CDeclaredAmount > 150000){
			     MessageBox.information("Total Amount can't be more than 1Lac 50k");
			}else{
			    this._onSave80CDataSet(odata);
			}*/

		},

		_onSaveHousePropertyDataSet: function(oData) {
			var oModel = this.getOwnerComponent().getModel();
			var oUrl = "/TaxOtherSources";
			//var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, '1000');
			//var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, '2022-2023');
			oModel.create(oUrl, oData[0], {
					success: function(response) {
						MessageBox.information("The Other Sources data is saved");
					},
					error: function(error) {
						MessageBox.information("The Other Sources data is not saved");
					}
				}

			);
		},

		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		}

	});
});