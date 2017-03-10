sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("com.test.issow.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			// create the views based on the url/hash
			this.getRouter().initialize();
				
	
			// additional initialization can be done here
			
			//Create a handler for the event when data has been reteurned for the model - use this to set the busy indicator
			var model = this.getModel("procedure");
			model.attachRequestCompleted(function() {
        		console.log("Data request completed");
    		});
		}

	});
});