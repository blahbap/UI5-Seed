sap.ui.define([
	"sap/ui/core/mvc/Controller"], 
	function (Controller) {
	"use strict";
	return Controller.extend("com.test.issow.controller.Menu", {
		onInit: function() {
		},
		onPress: function(oEvent) {			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview");
		}
	});

});