sap.ui.define([
	"sap/ui/core/mvc/Controller"], 
	function (Controller) {
	"use strict";
	return Controller.extend("com.test.issow.controller.List", {
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var ctx = oItem.getBindingContext("procedure").getProperty("IC");
			oRouter.navTo("detail", {
				procedureId: ctx
				//procedurePath:   encodeURIComponent(oItem.getBindingContext("procedure").getPath().substr(1))
			});
		},
		onNav: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("menu");
		}
	});

});