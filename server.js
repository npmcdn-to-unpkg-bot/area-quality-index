'use strict';
let express = require('express');
let app = express();
let bodyParser = require('body-parser');;

let request = require('request');

var geocoder = require('node-geocoder')({
    provider: 'google'
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port

var router = express.Router();

router.get('/api/area_data/:code', function(req, res) {
    console.log(req.params.code);
    let zipcode = req.params.code;

    // Basic data for the query
    let requestData = {
        "query": [{
            "code": "Postinumeroalue",
            "selection": {
                "filter": "item",
                "values": [
                    zipcode
                ]
            }
        }],
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
        if (error) {
            console.log("no data, error", error);
            res.json('no data', error);
        }

	    let indexes = response.body.dataset.dimension.Tiedot.category.index;
	    let data = response.body.dataset.value;
	    let toClient = {
	    	'status': 1,
	    	'zip': zipcode,
	        'household-avg-size': data[indexes['Te_takk']],
	        'median-income': data[indexes['Tr_mtu']],
	        'house-owners': data[indexes['Te_omis_as']],
	        'renters': data[indexes['Te_vuok_as']],
	        'average-age': data[indexes['He_kika']],
	        'jobless': (data[indexes['Pt_tyott']] / data[indexes['Pt_tyovy']]),
	    }
	    
        res.json(toClient);
	});
});

router.get('/api/area/:searchword', function(req, res) {
    console.log(req.params.searchword);
    geocoder.geocode(req.params.searchword + ', Finland')
        .then(function(promiseRes) {
            if (promiseRes.length > 0 && promiseRes[0].zipcode) {
                res.json(promiseRes);
            }
            else if (!promiseRes[0].zipcode) {
                res.json('-2');
            } else {
                res.json('-1');
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});

router.get('/api/area_with_area_data/:searchword', function(req, res) {
    console.log(req.params.searchword);

    request(req.protocol + '://' + req.header('host') + '/api/area/' + req.params.searchword, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let firstItem = JSON.parse(body)[0];
        console.log(firstItem);
        request(req.protocol + '://' + req.header('host') + '/api/area_data/' + firstItem.zipcode, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            console.log("JEEEEE" + body);
            firstItem.area_data = JSON.parse(body);
            res.json(firstItem);
          }
          else {
            console.log("no data, error", error);
            res.json('no data', error);
          }
        });
      }
      else {
        console.log("no data, error", error);
        res.json('no data', error);
      }
    });
});

app.use('/', router);
app.use(express.static(__dirname + '/'));

app.listen(port);
console.log('Magic happens on port ' + port);
