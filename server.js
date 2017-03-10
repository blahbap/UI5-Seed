var express = require('express');  
var request = require('request');
var config = require('config'); 
var _ = require('lodash');

var app = express();  
var PORT = 3000; 


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Ignore certificate errors

console.log("Serving from " + __dirname ); 

// Static routing
app.use(express.static(__dirname + '/webapp'));
app.use('/prod', express.static('./dist'));

// Local routes 

// General routing of all URLs to SAP server - gets system from query parameter and looks up URL for system in config 
app.use('/sap', function(req, res) {  
	
		
		var url = 'https://its-de2.conocophillips.net';
		url = url + '/sap' + req.url;

		console.log('Routing API call to URL: ' + url);

		req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || PORT);  
console.log('Server running on port ' + PORT);