let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let barToZip = reuqire('../core/BarcodeToPostcode.js');
let zipToBar = reuqire('../core/PostcodeToBarcode.js');

app.post('/zipToBar', function (req, res) {
    let result = new zipToBar().printBarcode(req.query.code);
    res.send(result);
});

app.post('/barToZip', function (req, res) {
    let result = new barToZip().printPostCode(req.body.code);
    res.send(result);
});

app.listen(3000);
module.exports = app;
