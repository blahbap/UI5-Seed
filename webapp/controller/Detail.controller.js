sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	return Controller.extend("com.test.issow.controller.Detail", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		
		},
		onNav(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview");
		},
		_onObjectMatched: function(oEvent) {
			
			// Get the model
			var model = this.getView().getModel("procedure");
			
			//another way to get data
			//var data = model.getData();
			
			//Get array of procedues
			var procedures = model.getProperty("/Procedures");
			
			//Get key of selected procedure 
			var key =  oEvent.getParameter("arguments").procedureId;
			
			//Get index by key
			var procedureIndex = _.findIndex(procedures, ['IC', key]);
			
			
			this.getView().bindElement({
				path: "/Procedures/" + procedureIndex,
				//path: "/Procedures/0",
				//path: "/" + decodeURIComponent(oEvent.getParameter("arguments").procedurePath),
				model: "procedure"
			});
		}

	});

});