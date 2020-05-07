var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
const {retarg, retdata} = require('./controlfactor');

app.use(cookieParser());
var {tbot} = require('./config.js');
var admin = require('./admin.js');

app.all('/delay/:t', async function(req, res) {
    await setTimeout(
        function() {
            return res.send('Delayed');
        },
        req.params.t  * 1000      
    );
});


app.all('/302', function(req, res) {
    res.redirect(302,retarg['302']);
});

app.all('/301', function(req, res){
    res.redirect(301,retarg['301']);
});
app.all('/307', function(req, res){
    res.redirect(307,retarg['307']);
});



app.all('/favicon', function(req, res){
    return res.sendStatus(404);
});

app.use(admin);

app.use(/^\/$/,function(req, res) {
    retdata.merge(req.query._ret);
    let data = retdata.retrieve(req);
    tbot.sendMsg(data);
    return res.send(data);
});

function startServer(){
    console.log('start server: 0.0.0.0:7126');
    app.listen(7126,'0.0.0.0');
}

if(require.main === module) {
    startServer();
}else {
    module.exports = startServer;
}
