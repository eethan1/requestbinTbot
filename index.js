var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
const {retarg, retdata} = require('./controlfactor');
app.use(cookieParser());
var {tbot,host,port} = require('./config.js');
var admin = require('./admin.js');
app.use(require('body-parser')({ extended: true }));
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

var tmpfile;
app.get('/tmp/reset', function(req, res) {
    tmpfile = '';
    res.send('alright'+'<script>location.href="/tmp"</script>');
});
app.get('/tmp', function(req, res) {
    res.set('Content-Type', retarg.content_type);
    res.send(tmpfile+'<form method=POST actoin="/tmp"><textarea name="content"> </textarea><input type="submit"></form>').end();
});


app.post('/tmp', function(req, res) {
    tmpfile = req.body.content;
    res.send('ok');
});




app.all('/favicon', function(req, res){
    return res.sendStatus(404);
});

app.use(admin);

app.all('*', function(req, res) {
    retdata.merge(req.query._ret);
    let data = retdata.retrieve(req);
    tbot.sendMsg(data);
    return res.send(data);
});

function startServer(){
    console.log(`start server: ${host}:${port}`);
    app.listen(port,host);
}

if(require.main === module) {
    startServer();
}else {
    module.exports = startServer;
}
