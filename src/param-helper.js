const md5 = require('md5');
const config = require('../config');

function getFileName(params){
    var urlHash = md5(params.url.trim());

    return urlHash;
}

function getResizedFileName(params){
    var urlHash = md5(params.url.trim());
    var fileName = urlHash + '_' + params.height + '_' + params.width;

    return fileName;
}

function getParams(req){

    /*
     * Get values from URL Params
     */
    let url = req.query.url;
    let width = req.query.w ? req.query.w : req.query.width;
    let height = req.query.h ? req.query.h : req.query.height;

    try{
        width = parseInt(width);
    }
    catch{
        width = config.DefaultWidth;
    }

    try{
        height = parseInt(height);
    }
    catch  {
        height = config.DefaultHeight;
    }

    /*
     * Set default settings as needed
     */
    if(url === undefined){
        url = config.DefaultImageUrl;
    }

    if(width === undefined || isNaN(width)){
        width = config.DefaultWidth;
    }

    if(height === undefined || isNaN(height)){
        height = config.DefaultHeight;
    }

    return {
        height : height,
        width: width,
        url : url
    }
}


module.exports = {
    getFileName, getParams , getResizedFileName
}