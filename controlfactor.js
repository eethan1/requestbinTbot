'use strict';
var retdata = {
    'header' : true,
    'cookie' : true,
    'body'   : false,
    'url'    : true,
}
var retarg = {
    '301'   : '/',
    '302'   : '/',
    '307'   : '/',
    'delay' : '/',
}
function deepTrans(obj) {
    let data = {};
    for(let k of Object.keys(obj)) {
        if(typeof obj[k] === 'object') {
            data[k] = this.deepTrans(obj[k]);
        }else if(obj[k] === 'true') {
            data[k] = true;
        }else if(obj[k] === 'false') {
            data[k] = false;
        }else if(obj[k].match(/^'.*'$/)) {
            data[k] = obj[k].slice(1,-1);
        }else{
            data[k] = parseInt(obj[k]);
        }
    }
    return data;
}
function merge(obj=undefined) {
    console.log(obj);
    if(obj !== undefined){
        obj = this.deepTrans(obj);
        for(let k of Object.keys(this)) {
            if(obj[k] !== undefined) {
                this[k] = obj[k];
            }
        }
    }
}

retarg.deepTrans = deepTrans;
retarg.merge = merge;
retdata.deepTrans = deepTrans;
retdata.merge = merge;
retdata.retrieve = function(req) {
    let data = {}
    data.method = req.method;
    data.remote_ip = req.ips;

    if(req.header('Referer') && !this.header) {
        data.referer = req.header('Referer')
    }
    if(this.cookie && !this.header) {
        data.cookie = req.cookies;
    }
    if(this.url) {
        data.url = req.originalUrl;
    }
    if(this.header) {
        data.header = req.headers;
    }
    
    if(data.method === 'GET') {
        data.query = req.query;
    }else if(data.method === 'POST' || this.body) {
        data.body = req.body;
    }
    return data;
}

module.exports = {
    retdata : retdata,
    retarg  : retarg,
}