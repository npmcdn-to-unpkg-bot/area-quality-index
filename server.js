'use strict';

let express    = require('express');        
let app        = express();                 
let bodyParser = require('body-parser');; 

let request		= require('request'); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

var router = express.Router();   

router.get('/api/area/:code', function(req, res) {
	console.log(req.params.code);
	let zipcode = req.params.code;
		// Basic data for the query
	    let requestData = {
				  "query": [
				    {
				      "code": "Postinumeroalue",
				      "selection": {
				        "filter": "item",
				        "values": [
				          zipcode
				        ]
				      }
				    }
				  ],
				  "response": {
				    "format": "json-stat"
					}
		}; 
		request({
	    	url: 'http://pxnet2.stat.fi/PXWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2016/paavo_9_koko_2016.px',
	    	method: 'POST',
	    	json: true,
	    	body: requestData,

	    }, (error, response, body) => {
	        	if(error) {
	        		console.log("no data, error", error);
	        		res.json('no data', error);
	        	}
	        	res.json(response);
	        }); 
});

router.get('/test', function(req, res) {
	res.json({test: 'test'});
});

// router.get('/api/area/:code',
//     function *(next) {
//         console.log(this.params.code);
//         var zipcode = this.params.code;
//         // this.body = 'hello world';

//         let data =  yield getData(zipcode);
//         console.log("data should be here", data);
//         this.body = "test: " + data; 
//     }
// );


app.use('/', router);
app.use(express.static(__dirname + '/'));

app.listen(port);
console.log('Magic happens on port ' + port);