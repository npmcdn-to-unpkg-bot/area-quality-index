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

router.get('/api/area/:code', function(req, res) {
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
        res.json(response);
    });
    let indexes = response.body.dataset.dimension.Tiedot.category.index;
    let data = response.body.dataset.value;
    let toClient = {
        'household-avg-size': data[indexes['Te_takk']],
        'median-income': data[indexes['Tr_mtu']],
        'house-owners': data[indexes['Te_omis_as']],
        'renters': data[indexes['Te_vuok_as']],
        'average-age': data[indexes['He_kika']],
        'jobless': (data[indexes['Pt_tyott']] / data[indexes['Pt_tyovy']]),
    }
    res.json(toClient);
});

router.get('/api/zip/:address', function(req, res) {
    console.log(req.params.address);
    let address = req.params.address;

    geocoder.geocode(req.params.address)
        .then(function(promiseRes) {
            if (promiseRes.length > 0) {
                res.json(promiseRes[0].zipcode);
            } else {
                res.json("-1");
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});



app.use('/', router);
app.use(express.static(__dirname + '/'));

app.listen(port);
console.log('Magic happens on port ' + port);
