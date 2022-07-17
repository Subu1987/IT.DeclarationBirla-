sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("IT.DeclarationBirla.controller.Main", {
	    
	    onInit: function(){
	        
	        
	        // create a model for sec80c
/*	        var oModel2 = new JSONModel("model/sec80c.json");
	        
	        this.getView().setModel(oModel2,"model2");
	        console.log(oModel2);
	        
	        var oModel3 = new JSONModel("model/otherChapter.json");
	        
	        this.getView().setModel(oModel3,"model3");
	        
	        console.log(oModel3);*/
	        
	        
	        var oModel = this.getView().getModel();

	        var yearSetUrl = "/YEARSet?$filter=(Pernr eq '1000')";
	        
	        oModel.read(yearSetUrl, {
	            success : function(response){
	                console.log(response);
	            },
	            error : function(error){
	                console.log(error);
	            }
	        });
	        
	    },
  
	    // onPress button
	   onPress: function(oEvent){
	       
	       
	       // retrive the button id
	       var oButton = oEvent.getSource().getId();
	       console.log(oButton);
	       
	       
	       var myButton = this.getView().byId("OtherChapter");
	       console.log(myButton.getId());
	       
	       if(oButton === "__xmlview2--sec80c"){
	           this.getOwnerComponent().getTargets().display("page2");
	           console.log("hello");
	       }
	       else if(oButton === "__xmlview2--OtherChapter"){
	           this.getOwnerComponent().getTargets().display("page3");
	       }
	       

	       // retrive the button txt
	       /*var oText = oEvent.getSource().getText();
		   console.log(oText);*/
		   
		   
        
	       
	       
	   },
	   onClose:function(){
	       this.getOwnerComponent().getTargets().display("Main");
	   }

	});
});