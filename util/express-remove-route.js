var express = require('express');
var app = express();
app.get('/get', function(req,res){});
app.post('/post', function(req, res){});
app.use(function(req,res,) {});
var router = express.Router();
router.get('/api/rout');

app.use('/r',router);



function _findLayer(path, stack) {
    var layers = [];
    



}


function findLayer(path, app) {
    var stack = app._route.stack;
    return _findLayer(path, stack);
}

