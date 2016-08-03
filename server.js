var express = require('express');  
var request = require('request');
var config = require('config'); 
var _ = require('lodash');

var app = express();  
var PORT = 3000; 

var systems = config.get("systems");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Ignore certificate errors

console.log("Serving from " + __dirname ); 

// Static routing
app.use(express.static(__dirname + '/src'));
app.use('/prod', express.static('./dist'));

// Local routes 
// Service for list of systems - systems are defined under config/default.json
app.use('/systems', function(req, res) {  		
	res.send(systems);
});

// General routing of all URLs to SAP server - gets system from query parameter and looks up URL for system in config 
app.use('/sap', function(req, res) {  
	
	var sapSystem = req.query.sapsystem;
	if (sapSystem) {
		
		var url = _.find(systems, {'name': sapSystem}).url;
		url = url + '/sap' + req.url;

		console.log('Routing API call to URL: ' + url);

		req.pipe(request(url)).pipe(res);
	} else {
		console.log('Error - no SAP system query parameter in URL');
	}
});

app.listen(process.env.PORT || PORT);  
console.log('Server running on port ' + PORT);