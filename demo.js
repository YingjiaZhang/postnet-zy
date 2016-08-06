let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
let barToZip = require('./src/core/BarcodeToPostcode.js');
let zipToBar = require('./src/core/PostcodeToBarcode.js');

app.post('/zipToBar', function (req, res) {
    let result = new zipToBar().printBarcode(req.body.code);
    res.send(result);
});

app.post('/barToZip', function (req, res) {
    let result = new barToZip().printPostCode(req.body.code);
    res.send(result);
});

app.listen(3000);
