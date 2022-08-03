sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, Filter,MessageBox) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Sec80", {

		onInit: function() {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("Sec80").attachPatternMatched(this._onRead80DataSet, this);

		},

		onChange: function(oEvent) {
			var oData = this.getOwnerComponent().getModel('sec80').getData();
			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			oJsonGlobalData.oTotal80DeclaredAmount = 0;

			for (var i = 0; i < oData.length; i++) {
				/*oJsonGlobalData.oTotal80DeclaredAmount += Number(oData[i].Amount);*/
				var newData = oData[i];
				var strj;
				for (var j = 1; j <= 40; j++) {
				    strj = '';
				    if(j<10){
				        strj='0'+j.toString();
				    }else{
				        strj=j.toString();
				    }
				    var str = "Pcn"+strj;
				    oJsonGlobalData.oTotal80DeclaredAmount += Number(newData[str]);
				}

			}
			this.getOwnerComponent().getModel("globalData").setData(oJsonGlobalData);

		},

		onSave: function() {
			var dataArray = this.getOwnerComponent().getModel('sec80').getData();
			
			for (var i = 0; i < dataArray.length; i++) {
				delete dataArray[i].__metadata;
			}
			/*var newDataArray = dataArray[0].trim();*/

			var oJsonGlobalData = this.getOwnerComponent().getModel("globalData").getData();

            /* if (oJsonGlobalData.oTotal80CDeclaredAmount === 0) {
				MessageBox.information("Input Amount can't be zero");
			} else if (oJsonGlobalData.oTotal80CDeclaredAmount > 100000) {
				MessageBox.information("Total Amount can't be more than 1Lac");
			} else {
				this._onSave80DataSet(dataArray);
			}*/
			this._onSave80DataSet(dataArray);
		},

		_onSave80DataSet: function(oData) {
			
			var oModel = this.getOwnerComponent().getModel();
			var oUrl = "/Tax80";
			//var oPernerFilter = new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, '1000');
			//var oFiscalYearFilter = new sap.ui.model.Filter("Fiscal", sap.ui.model.FilterOperator.EQ, '2022-2023');
			oModel.create(oUrl, oData[0], {
					success: function(response) {
						MessageBox.information("The 80 data is saved");
					},
					error: function(error) {
						MessageBox.information("The 80 data is not saved");
					}
				}

			);
		},

		onClose: function() {
			this.getOwnerComponent().getTargets().display("Main");
		}

	});
});