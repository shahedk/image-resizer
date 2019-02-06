const downloader = require('./downloader');
const paramHelper = require('./param-helper');
const resizer = require('./resizer');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// Handle request
async function resizeImage(req, res, next) {

    const params = paramHelper.getParams(req);
    const fileName = paramHelper.getFileName(params);

    try{
        const downloadedFileName = await downloader.download(params.url, fileName);

        const downloadedFilePath = './tmp/' + downloadedFileName;
        const resizedFileName = await resizer.resize( downloadedFilePath, params);

        const resizedFilePath = './tmp/' + resizedFileName;

        const file = await readFile(resizedFilePath);

        res.write(file);
        res.end();

    }
    catch (e){
        next(e);
    }
}


module.exports = {
    resizeImage
}