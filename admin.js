var express = require('express');
var admin = express.Router();
var {admin_key} = require('./config.js');
const crypto = require('crypto');
var {retarg, retdata} = require('./controlfactor');
var {tbot} = require('./config.js');

function checkAuth(a,pass) {
    console.log(`Try login with ${a}`);
    let tmp = crypto.createHash('md5').update(a).digest('hex')
    return  crypto.createHash('md5').update(tmp).digest('hex') === pass;
}

function auth(req, res, next) {
    let pass = req.cookies._jizz;
    console.log(pass);
    if(pass === undefined) {
        res.status(403);
        return res.send('Jizz');
    }
    if(!checkAuth(pass,admin_key)) {
        retdata.merge(req.query._ret);
        let data = retdata.retrieve(req);
        tbot.sendMsg(data);
        res.status(403);
        return res.send('Jizz');
    }
    next();
}
admin.get('/retarg',auth, function(req, res) {
    retarg.merge(req.query._ret);
    return res.send(retarg).end();
});
admin.get('/retdata', auth,function(req, res) {
    console.log(req.query);
    retdata.merge(req.query._ret);

    return res.send(retdata);
});

admin.post('/retarg', auth,function(req, res) {
    retarg.merge(req.body._ret);
    return res.send(retarg);
});
admin.post('/retdata', auth,function(req, res) {
    retdata.merge(req.body._ret);
    return res.send(retdata);
});

admin.get('/reset', auth,function(req, res) {
    res.send('reset').end();
    console.log('Exit from reqeust');
    process.exit(0);
});

module.exports = {
    route:admin,
    authMiddleware: auth,
    checkAuth: checkAuth
}